import { CardFormValues, ConfigState, ModelState } from 'checkout/state';
import { createPayment, createPaymentResource, getPaymentSubject, pollEvents } from './';

export const pay = (c: ConfigState, m: ModelState, v: CardFormValues) => {
    const endpoint = c.appConfig.capiEndpoint;
    const email = c.initConfig.email || v.email;
    return getPaymentSubject(c, m, v.amount).then((subject) =>
        createPaymentResource(subject, endpoint, v).then((paymentResource) =>
            createPayment(subject, endpoint, paymentResource, email).then(() =>
                pollEvents(endpoint, subject).then((events) => events))));
};
