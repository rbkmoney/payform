import { call, CallEffect } from 'redux-saga/effects';
import {
    PaymentResource,
    PaymentFlow,
    PayerType,
    createPayment as request,
    FlowType,
    PaymentFlowHold,
    PaymentParams,
    Payer
} from 'checkout/backend';
import { Payment } from 'checkout/backend/model';
import { InitConfig } from 'checkout/config';

type Effects = CallEffect | Payment;

const toPaymentFlow = (c: InitConfig): PaymentFlow => {
    const instant: PaymentFlow = { type: FlowType.PaymentFlowInstant, isRecurring: c.recurring };
    const hold: PaymentFlowHold = { type: FlowType.PaymentFlowHold, onHoldExpiration: c.holdExpiration };
    return c.paymentFlowHold ? hold : instant;
};

export function* createPayment(
    endpoint: string,
    token: string,
    invoiceID: string,
    formEmail: string,
    resource: PaymentResource,
    initConfig: InitConfig
): Iterator<Effects> {
    const email = initConfig.email || formEmail;
    const { paymentToolToken, paymentSession } = resource;
    const params: PaymentParams = {
        flow: toPaymentFlow(initConfig),
        payer: {
            payerType: PayerType.PaymentResourcePayer,
            paymentToolToken,
            paymentSession,
            contactInfo: {
                email
            }
        } as Payer,
        makeRecurrent: initConfig.recurring
    };
    return yield call(request, endpoint, token, invoiceID, params);
}
