import { StepStatus } from 'checkout/lifecycle';
import { FormContainerProps } from '../../form-container-props';
import { Shortened } from '../form-flow-resolver';
import { check, Type } from 'checkout/event-checker';

const pollEvents = (p: FormContainerProps) => {
    const endpoint = p.config.appConfig.capiEndpoint;
    const token = p.model.invoiceAccessToken;
    const invoiceID = p.model.invoice.id;
    p.pollInvoiceEvents(endpoint, token, invoiceID);
};

export const resolveEvents = (fn: Shortened, current: FormContainerProps) => {
    const done = check(current.model.invoiceEvents).type !== Type.unexplained;
    const start = current.cardPayment.createPayment === StepStatus.done;
    fn('pollEvents', pollEvents.bind(null, current), done, start);
};
