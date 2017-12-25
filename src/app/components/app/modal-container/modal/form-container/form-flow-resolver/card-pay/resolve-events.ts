import { last } from 'lodash';
import { StepStatus } from 'checkout/lifecycle';
import { FormContainerProps } from '../../form-container-props';
import { Shortened } from '../form-flow-resolver';
import { checkLastChange } from 'checkout/form-flow';
import { ChangeType, Event } from 'checkout/backend';

const pollEvents = (p: FormContainerProps) => {
    const endpoint = p.config.appConfig.capiEndpoint;
    const token = p.model.invoiceAccessToken;
    const invoiceID = p.model.invoice.id;
    const event = last(p.model.invoiceEvents);
    p.pollInvoiceEvents(endpoint, token, invoiceID, event ? event.id : null);
};

const isDone = (e: Event[]): boolean => {
    const isLastChange = checkLastChange.bind(null, e);
    const isInvoiceChange = isLastChange.bind(null, ChangeType.InvoiceStatusChanged);
    const isPaymentChange = isLastChange.bind(null, ChangeType.PaymentStatusChanged);
    return isInvoiceChange() || isPaymentChange();
};

const resolve = (startCondition: boolean, fn: Shortened, p: FormContainerProps) =>
    fn('pollEvents', pollEvents.bind(null, p), isDone(p.model.invoiceEvents), startCondition);

export const resolveEvents = (fn: Shortened, p: FormContainerProps) =>
    resolve(p.cardPayment.createPayment === StepStatus.done, fn, p);

export const continuePolling = (fn: Shortened, p: FormContainerProps) =>
    resolve(!!p.model.invoiceAccessToken, fn, p);
