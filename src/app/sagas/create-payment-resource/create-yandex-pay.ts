import { call, CallEffect } from 'redux-saga/effects';
import { PaymentToolType, ProviderType, createPaymentResource, PaymentResource } from 'checkout/backend';

export function* createYandexPay(
    endpoint: string,
    gatewayMerchantID: string,
    paymentToken: object,
    token: string
): Iterator<CallEffect | PaymentResource> {
    const paymentTool = {
        paymentToolType: PaymentToolType.TokenizedCardData,
        provider: ProviderType.YandexPay,
        gatewayMerchantID,
        paymentToken
    };
    return yield call(createPaymentResource, endpoint, token, paymentTool);
}
