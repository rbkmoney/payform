import { toNumber, clone } from 'lodash';
import { CardFormFlowItem, FormFlowStatus, FormName, ModelState } from 'checkout/state';
import { add, getActive, next, update } from 'checkout/components/app/form-flow-manager';
import { IntegrationType, InvoiceInitConfig, InvoiceTemplateInitConfig } from 'checkout/config';
import { FormContainerProps } from './form-container-props';
import { resolveStage, StepStatus } from 'checkout/lifecycle';
import { FlowType, PayerType, PaymentToolType } from 'checkout/backend';
import { getAmount } from '../amount-resolver';
import { resolveEvents } from './form-flow-resolver/resolve-events';
import { check, Type } from 'checkout/event-checker';
import { FormFlowItem } from 'checkout/state/flow-state/flow-item';

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

const prepareAndGoNext = (f: FormFlowItem[], p: FormContainerProps): FormFlowItem[] => {
    const withNext = add(f, {
        formName: FormName.paymentMethods,
        active: false,
        status: FormFlowStatus.unprocessed
    });
    return next(withNext);
};

const resolveCardForm = (p: FormContainerProps, i: CardFormFlowItem) => {
    const checked = check(p.model.invoiceEvents);
    if (checked.type === Type.unexplained) {
        pay(p, i);
    } else {
        const processed = clone(i);
        processed.status = FormFlowStatus.processed;
        p.setFormFlow(prepareAndGoNext(update(p.formsFlow, processed), p));
    }
};

export const resolveFormFlow = (p: FormContainerProps) => {
    const activeFlow = getActive(p.formsFlow);
    if (activeFlow.status === FormFlowStatus.inProcess) {
        switch (activeFlow.formName) {
            case FormName.cardForm:
                resolveCardForm(p, activeFlow as CardFormFlowItem);
                break;
        }
    }
};
