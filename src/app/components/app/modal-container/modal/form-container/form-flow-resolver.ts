import { toNumber, clone } from 'lodash';
import { ModelState } from 'checkout/state';
import { IntegrationType, InvoiceInitConfig, InvoiceTemplateInitConfig } from 'checkout/config';
import { FormContainerProps } from './form-container-props';
import { resolveStage, StepStatus } from 'checkout/lifecycle';
import {
    BrowserPostRequest,
    Event,
    FlowType,
    InteractionType,
    PayerType,
    PaymentInteractionRequested,
    PaymentToolType,
    Redirect,
    RequestType
} from 'checkout/backend';
import { CardFormFlowItem, FormFlowItem, FormFlowStatus, ModalInteractionFlowItem } from 'checkout/form-flow/flow-item';
import { getAmount } from '../amount-resolver';
import { resolveEvents } from './form-flow-resolver/resolve-events';
import { check, Type } from 'checkout/event-checker';
import { add, FormName, getActive, next, update } from 'checkout/form-flow';

const stageName = 'cardPayment';

export type Shortened = (stepName: string, action: () => any, doneCondition: boolean, startCondition?: boolean) => void;

const replaceSpaces = (str: string): string => str.replace(/\s+/g, '');

const resolveAmount = (t: IntegrationType, m: ModelState, formAmount: string): number =>
    formAmount ? toNumber(formAmount) * 100 : getAmount(t, m).value;

const createInvoiceWithTemplate = (p: FormContainerProps, i: CardFormFlowItem) => {
    const endpoint = p.config.appConfig.capiEndpoint;
    const c = p.config.initConfig as InvoiceTemplateInitConfig;
    const amount = resolveAmount(IntegrationType.invoiceTemplate, p.model, i.values.amount);
    const metadata = p.model.invoiceTemplate.metadata;
    const params = {amount, metadata, currency: 'RUB'}; // TODO fix hardcoded currency
    p.createInvoiceWithTemplate(endpoint, c.invoiceTemplateAccessToken, c.invoiceTemplateID, params);
};

const createPaymentResource = (p: FormContainerProps, i: CardFormFlowItem) => {
    const endpoint = p.config.appConfig.capiEndpoint;
    const token = p.model.invoiceAccessToken;
    const cardNumber = replaceSpaces(i.values.cardNumber);
    const expDate = replaceSpaces(i.values.expireDate);
    const paymentTool = {
        paymentToolType: PaymentToolType.CardData,
        cardNumber,
        expDate,
        cvv: i.values.secureCode,
        cardHolder: i.values.cardHolder
    };
    p.createPaymentResource(endpoint, token, paymentTool);
};

const createPayment = (p: FormContainerProps, i: CardFormFlowItem) => {
    const endpoint = p.config.appConfig.capiEndpoint;
    const token = p.model.invoiceAccessToken;
    const invoiceID = p.model.invoice.id;
    const email = i.values.email;
    const {paymentToolToken, paymentSession} = p.model.paymentResource;
    const request = {
        flow: {
            type: FlowType.PaymentFlowInstant
        },
        payer: {
            payerType: PayerType.PaymentResourcePayer,
            paymentToolToken,
            paymentSession,
            contactInfo: {
                email
            }
        }
    };
    p.createPayment(endpoint, token, invoiceID, request);
};

const setInvoiceAccessToken = (p: FormContainerProps) => {
    const token = (p.config.initConfig as InvoiceInitConfig).invoiceAccessToken;
    p.setInvoiceAccessToken(token);
};

const resolveInvoiceTemplate = (fn: Shortened, p: FormContainerProps, i: CardFormFlowItem) => {
    const done = !!(p.model.invoice && p.model.invoiceAccessToken);
    fn('createInvoice', createInvoiceWithTemplate.bind(null, p, i), done);
};

const resolveInvoice = (fn: Shortened, p: FormContainerProps) => {
    const done = !!p.model.invoiceAccessToken;
    fn('createInvoice', setInvoiceAccessToken.bind(null, p), done);
};

const resolveIntegrationType = (fn: Shortened, p: FormContainerProps, i: CardFormFlowItem) => {
    const initConfig = p.config.initConfig;
    switch (initConfig.integrationType) {
        case IntegrationType.invoiceTemplate:
            resolveInvoiceTemplate(fn, p, i);
            break;
        case IntegrationType.invoice:
            resolveInvoice(fn, p);
            break;
        case IntegrationType.customer:
            throw new Error('Unhandled customer integration');
    }
};

const resolvePaymentResource = (fn: Shortened, p: FormContainerProps, i: CardFormFlowItem) => {
    const done = !!p.model.paymentResource;
    const start = p.cardPayment.createInvoice === StepStatus.done;
    fn('createPaymentResource', createPaymentResource.bind(null, p, i), done, start);
};

const resolvePayment = (fn: Shortened, p: FormContainerProps, i: CardFormFlowItem) => {
    const done = !!p.model.payment;
    const start = p.cardPayment.createPaymentResource === StepStatus.done;
    fn('createPayment', createPayment.bind(null, p, i), done, start);
};

const pay = (p: FormContainerProps, i: CardFormFlowItem) => {
    const shortened = resolveStage.bind(null, p.cardPayment, p.changeStepStatus, stageName);
    resolveIntegrationType(shortened, p, i);
    resolvePaymentResource(shortened, p, i);
    resolvePayment(shortened, p, i);
    resolveEvents(shortened, p);
};

const getRedirect = (redirect: Redirect): BrowserPostRequest => {
    if (redirect.request.requestType === RequestType.BrowserPostRequest) {
        return redirect.request as BrowserPostRequest;
    }
    throw new Error('Unsupported user interaction browser request type');
};

const getRequest = (events: Event[]): BrowserPostRequest => {
    const checkResult = check(events);
    const change = checkResult.change as PaymentInteractionRequested;
    const interaction = change.userInteraction;
    switch (interaction.interactionType) {
        case InteractionType.Redirect:
            return getRedirect(interaction as Redirect);
        case InteractionType.PaymentTerminalReceipt:
            throw new Error('Unsupported user interaction browser request type');
    }
};

const prepareInteractionFlow = (f: FormFlowItem[], p: FormContainerProps): FormFlowItem[] => {
    return add(f, {
        formName: FormName.modalInteraction,
        active: true,
        status: FormFlowStatus.unprocessed,
        request: getRequest(p.model.invoiceEvents)
    } as ModalInteractionFlowItem);
};

const resolveCardForm = (p: FormContainerProps, i: CardFormFlowItem) => {
    const checkedEvent = check(p.model.invoiceEvents);
    switch (checkedEvent.type) {
        case Type.unexplained:
            pay(p, i);
            break;
        case Type.interaction:
            const processed = clone(i);
            processed.status = FormFlowStatus.processed;
            p.setFormFlow(next(prepareInteractionFlow(update(p.formsFlow, processed), p)));
            break;
        case Type.success:
        case Type.failed:
        // TODO need to implement
    }
};

export const resolveFormFlow = (p: FormContainerProps) => {
    const activeFlow = getActive(p.formsFlow);
    if (activeFlow.status === FormFlowStatus.inProcess) {
        switch (activeFlow.formName) {
            case FormName.cardForm:
                resolveCardForm(p, activeFlow as CardFormFlowItem);
                break;
            case FormName.resultForm:
                // TODO need to implement
                break;
        }
    }
};
