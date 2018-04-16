import { call, CallEffect } from 'redux-saga/effects';
import {
    PaymentToolType,
    ProviderType,
    createPaymentResource as request,
    PaymentResource,
} from 'checkout/backend';

export function* createPaymentResource(endpoint: string, merchantID: string, paymentToken: ApplePayPayment, token: string): Iterator<CallEffect | PaymentResource> {
    const paymentTool = {
        paymentToolType: PaymentToolType.TokenizedCardData,
        provider: ProviderType.ApplePay,
        merchantID,
        paymentToken
    };
    return yield call(request, endpoint, token, paymentTool);
}
