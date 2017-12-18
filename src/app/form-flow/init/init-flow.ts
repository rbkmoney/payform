import { checkLastChange, getLastChange } from '../event-checker';
import { FormFlowItem } from '../flow-item';
import { InitConfig } from 'checkout/config';
import { ChangeType } from 'checkout/backend';
import { ModelState } from 'checkout/state';
import { initWithReadyToPay } from './init-with-ready-to-pay';
import { initWithProcessedResult } from './init-with-processed-result';

const initWithEvents = (c: InitConfig, m: ModelState): FormFlowItem[] => {
    const isLastChange = checkLastChange.bind(null, m.invoiceEvents);
    if (isLastChange(ChangeType.InvoiceStatusChanged)) {
        return initWithProcessedResult(getLastChange(m.invoiceEvents));
    } else if (isLastChange(ChangeType.InvoiceCreated)) {
        return initWithReadyToPay(c, m);
    } else if (isLastChange(ChangeType.PaymentInteractionRequested)) {
        throw new Error('Unhandled event type');
    } else if (isLastChange(ChangeType.PaymentStarted)) {
        throw new Error('Unhandled event type');
    } else {
        return initWithReadyToPay(c, m);
    }
};

const initWithoutEvents = (c: InitConfig, m: ModelState): FormFlowItem[] => initWithReadyToPay(c, m);

export const initFormsFlow = (c: InitConfig, m: ModelState): FormFlowItem[] =>
    m.invoiceEvents ? initWithEvents(c, m) : initWithoutEvents(c, m);
