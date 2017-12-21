import { clone } from 'lodash';
import { FormContainerProps } from '../form-container-props';
import { CardFormFlowItem, FormFlowStatus } from 'checkout/form-flow/flow-item';
import {
    addActiveInteraction,
    FormFlowItem,
    FormName,
    getActive,
    getLastEventID,
    next,
    update
} from 'checkout/form-flow';
import { pay } from './card-pay';
import { prepareResultFlow } from './prepare-result-flow';
import { checkLastChange } from 'checkout/form-flow/event-checker';
import { ChangeType } from 'checkout/backend';
import { IntegrationType } from 'checkout/config';
import { getPaymentResult } from './get-payment-result';
import { StepStatus } from 'checkout/lifecycle';

export type Shortened = (stepName: string, action: () => any, doneCondition: boolean, startCondition?: boolean, retryCondition?: boolean) => void;

const resolveCardForm = (p: FormContainerProps, i: CardFormFlowItem) => {
    const events = p.model.invoiceEvents;
    if (!events && p.config.initConfig.integrationType === IntegrationType.invoiceTemplate) {
        pay(p, i);
    } else {
        const isLastChange = checkLastChange.bind(null, events, i.handledEventID);
        const isPaymentChange = isLastChange.bind(null, ChangeType.PaymentStatusChanged);
        const isInvoiceChange = isLastChange.bind(null, ChangeType.InvoiceStatusChanged);
        const isCardInteraction = isLastChange.bind(null, ChangeType.PaymentInteractionRequested);

        const processed = clone(i);
        processed.handledEventID = getLastEventID(events);
        processed.status = FormFlowStatus.processed;

        if (isPaymentChange() || isInvoiceChange()) {
            p.setFormFlow(next(prepareResultFlow(update(p.formsFlow, processed), p)));
        } else if (isCardInteraction()) {
            p.changeStepStatus('cardPayment', 'pollEvents', StepStatus.suspend);
            p.setFormFlow(next(addActiveInteraction(update(p.formsFlow, processed), events)));
        } else {
            pay(p, i);
        }
    }
};

const resolveResultForm = (p: FormContainerProps, i: FormFlowItem) => {
    const isLastChange = checkLastChange.bind(null, p.model.invoiceEvents, i.handledEventID);
    const isPaymentChange = isLastChange.bind(null, ChangeType.PaymentStatusChanged);
    const isInvoiceChange = isLastChange.bind(null, ChangeType.InvoiceStatusChanged);
    if (isPaymentChange() || isInvoiceChange()) {
        const processed = clone(i);
        processed.handledEventID = getLastEventID(p.model.invoiceEvents);
        processed.status = FormFlowStatus.processed;
        p.setFormFlow(next(prepareResultFlow(update(p.formsFlow, processed), p)));
    } else {
        getPaymentResult(p, i);
    }
};

const resolveInProcess = (p: FormContainerProps, i: FormFlowItem) => {
    switch (i.formName) {
        case FormName.cardForm:
            resolveCardForm(p, i as CardFormFlowItem);
            break;
        case FormName.resultForm:
            resolveResultForm(p, i);
            break;
    }
};

export const resolveFormFlow = (p: FormContainerProps) => {
    const activeFlow = getActive(p.formsFlow);
    switch (activeFlow.status) {
        case FormFlowStatus.inProcess:
            resolveInProcess(p, activeFlow);
            break;
    }
};
