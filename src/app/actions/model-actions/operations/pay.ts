import { CardFormValues, ConfigState, ModelState, PayableFormValues, WalletFormValues } from 'checkout/state';
import {
    createPayment,
    createPaymentResourceCardData,
    getPaymentSubject,
    pollEvents,
    createPaymentResourceDigitalWalletQiwi
} from './';
import { PayActionPayload } from '../pay-action';
import { FlowType, PaymentFlow, PaymentResource } from 'checkout/backend';
import { PaymentSubject } from './payment-subject';

type CreatePaymentResourceFn = (s: PaymentSubject, endpoint: string, v: PayableFormValues) => Promise<PaymentResource>;

const toPaymentFlow = (c: ConfigState): PaymentFlow => {
    const instant = {type: FlowType.PaymentFlowInstant};
    const hold = {type: FlowType.PaymentFlowHold, onHoldExpiration: c.initConfig.holdExpiration};
    return c.initConfig.paymentFlowHold ? hold : instant;
};

const pay = (c: ConfigState, m: ModelState, v: PayableFormValues, createPaymentResourceFn: CreatePaymentResourceFn): Promise<PayActionPayload> => {
    const endpoint = c.appConfig.capiEndpoint;
    const email = c.initConfig.email || v.email;
    return getPaymentSubject(c, m, v.amount).then((subject) =>
        createPaymentResourceFn(subject, endpoint, v).then((paymentResource) =>
            createPayment(subject, endpoint, paymentResource, email, toPaymentFlow(c)).then(() =>
                pollEvents(endpoint, subject, m.invoiceEvents).then((events) => ({
                    invoiceEvents: events,
                    invoiceAccessToken: subject.accessToken
                })))));
};

export const payCardData = (c: ConfigState, m: ModelState, v: CardFormValues): Promise<PayActionPayload> =>
    pay(c, m, v, createPaymentResourceCardData);

export const payDigitalWalletQiwi = (c: ConfigState, m: ModelState, v: WalletFormValues): Promise<PayActionPayload> =>
    pay(c, m, v, createPaymentResourceDigitalWalletQiwi);
