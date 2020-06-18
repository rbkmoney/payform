import { call, CallEffect } from 'redux-saga/effects';

import {
    PaymentResource,
    PaymentFlow,
    PayerType,
    createPayment as request,
    FlowType,
    PaymentFlowHold
} from 'checkout/backend';
import { Payment, PaymentFlowInstant } from 'checkout/backend/model';
import { InitConfig } from 'checkout/config';

type Effects = CallEffect | Payment;

export const toPaymentFlow = (c: InitConfig): PaymentFlow => {
    const instant: PaymentFlowInstant = { type: FlowType.PaymentFlowInstant };
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
    const params = {
        flow: toPaymentFlow(initConfig),
        payer: {
            payerType: PayerType.PaymentResourcePayer,
            paymentToolToken,
            paymentSession,
            contactInfo: {
                email
            }
        },
        makeRecurrent: initConfig.recurring,
        metadata: initConfig.metadata
    };
    return yield call(request, endpoint, token, invoiceID, params);
}
