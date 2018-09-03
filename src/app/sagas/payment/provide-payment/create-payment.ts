import { call, CallEffect } from 'redux-saga/effects';
import {
    PaymentResource,
    PaymentFlow,
    PayerType,
    createPayment as request,
    FlowType,
    PaymentFlowHold
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
    const { paymentToolToken, paymentSession, recurringSession } = resource;
    const sessionParams = initConfig.recurring ? { recurringSession } : { paymentSession };
    const params = {
        flow: toPaymentFlow(initConfig),
        payer: {
            payerType: PayerType.PaymentResourcePayer,
            paymentToolToken,
            ...sessionParams,
            contactInfo: {
                email
            }
        }
    };
    return yield call(request, endpoint, token, invoiceID, params);
}
