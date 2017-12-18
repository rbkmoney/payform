import { clone } from 'lodash';
import { FormContainerProps } from '../form-container-props';
import { CardFormFlowItem, FormFlowStatus } from 'checkout/form-flow/flow-item';
import { FormFlowItem, FormName, getActive, next, update } from 'checkout/form-flow';
import { pay } from './card-pay';
import { prepareInteractionFlow } from './prepare-interaction-flow';
import { prepareResultationFlow } from './prepare-resultation-flow';
import { checkLastChange } from 'checkout/form-flow/event-checker';
import { ChangeType } from 'checkout/backend';
import { IntegrationType } from 'checkout/config';
import { pollResultEvents } from './poll-result-events';
import { StepStatus } from 'checkout/lifecycle';

export type Shortened = (stepName: string, action: () => any, doneCondition: boolean, startCondition?: boolean, retryCondition?: boolean) => void;

const resolveCardForm = (p: FormContainerProps, i: CardFormFlowItem) => {
    const e = p.model.invoiceEvents;
    if (!e && p.config.initConfig.integrationType === IntegrationType.invoiceTemplate) {
        pay(p, i);
    } else {
        const isLastChange = checkLastChange.bind(null, p.model.invoiceEvents);
        const isPaymentChange = isLastChange.bind(null, ChangeType.PaymentStatusChanged);
        const isInvoiceChange = isLastChange.bind(null, ChangeType.InvoiceStatusChanged);
        const isCardInteraction = isLastChange.bind(null, ChangeType.PaymentInteractionRequested);
        const processed = clone(i);
        if (isPaymentChange() || isInvoiceChange()) {
            processed.status = FormFlowStatus.processed;
            p.setFormFlow(next(prepareResultationFlow(update(p.formsFlow, processed), p)));
        } else if (isCardInteraction()) {
            processed.status = FormFlowStatus.processed;
            p.changeStepStatus('cardPayment', 'pollEvents', StepStatus.suspend);
            p.setFormFlow(next(prepareInteractionFlow(update(p.formsFlow, processed), p)));
        } else {
            pay(p, i);
        }
    }
};

const resolveInProcess = (p: FormContainerProps, flow: FormFlowItem) => {
    switch (flow.formName) {
        case FormName.cardForm:
            resolveCardForm(p, flow as CardFormFlowItem);
            break;
        case FormName.resultForm:
            p.changeStepStatus('cardPayment', 'pollEvents', StepStatus.started);
            pollResultEvents(p, flow);
            break;
    }
};

export const resolveFormFlow = (p: FormContainerProps) => {
    const activeFlow = getActive(p.formsFlow);
    switch (activeFlow.status) {
        case FormFlowStatus.inProcess:
            resolveInProcess(p, activeFlow);
            break;
        case FormFlowStatus.retry:
            throw new Error('Unhandled FormFlowStatus');
    }
};
