import { last } from 'lodash';
import { StepStatus } from 'checkout/lifecycle';
import { FormContainerProps } from '../../form-container-props';
import { Shortened } from '../form-flow-resolver';
import { checkLastChange } from 'checkout/form-flow';
import { ChangeType } from 'checkout/backend';

const pollEvents = (p: FormContainerProps) => {
    const endpoint = p.config.appConfig.capiEndpoint;
    const token = p.model.invoiceAccessToken;
    const invoiceID = p.model.invoice.id;
    const event = last(p.model.invoiceEvents);
    p.pollInvoiceEvents(endpoint, token, invoiceID, event ? event.id : null);
};

export const resolveEvents = (fn: Shortened, current: FormContainerProps, retry?: boolean) => {
    const isLastChange = checkLastChange.bind(null, current.model.invoiceEvents);
    const isInvoiceChange = isLastChange.bind(null, ChangeType.InvoiceStatusChanged);
    const isPaymentChange = isLastChange.bind(null, ChangeType.PaymentStatusChanged);
    const done = isInvoiceChange() || isPaymentChange();
    const start = current.cardPayment.createPayment === StepStatus.done;
    fn('pollEvents', pollEvents.bind(null, current), done, start, retry);
};
