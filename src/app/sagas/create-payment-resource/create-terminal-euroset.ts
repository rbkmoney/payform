import { call, CallEffect } from 'redux-saga/effects';
import { createPaymentResource, PaymentResource, PaymentToolType } from 'checkout/backend';

export function* createTerminalEuroset(endpoint: string, token: string): Iterator<CallEffect | PaymentResource> {
    const paymentTool = {
        paymentToolType: PaymentToolType.PaymentTerminalData,
        provider: 'euroset'
    };
    return yield call(createPaymentResource, endpoint, token, paymentTool);
}
