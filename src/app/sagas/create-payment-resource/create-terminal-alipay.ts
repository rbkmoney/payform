import { call, CallEffect } from 'redux-saga/effects';
import { createPaymentResource, PaymentResource, PaymentToolType, PaymentTool } from 'checkout/backend';

export function* createTerminalAlipay(endpoint: string, token: string): Iterator<CallEffect | PaymentResource> {
    const paymentTool = {
        paymentToolType: PaymentToolType.PaymentTerminalData,
        provider: 'alipay'
    } as PaymentTool;
    return yield call(createPaymentResource, endpoint, token, paymentTool);
}
