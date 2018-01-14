import { CardFormValues, ConfigState, ModelState } from 'checkout/state';
import { createPayment, createPaymentResource, getPaymentSubject, pollEvents } from './';
import { PayActionPayload } from '../pay-action';

export const pay = (c: ConfigState, m: ModelState, v: CardFormValues): Promise<PayActionPayload> => {
    const endpoint = c.appConfig.capiEndpoint;
    const email = c.initConfig.email || v.email;
    return getPaymentSubject(c, m, v.amount).then((subject) =>
        createPaymentResource(subject, endpoint, v).then((paymentResource) =>
            createPayment(subject, endpoint, paymentResource, email).then(() =>
                pollEvents(endpoint, subject, m.invoiceEvents).then((events) => ({
                    invoiceEvents: events,
                    invoiceAccessToken: subject.accessToken
                })))));
};
