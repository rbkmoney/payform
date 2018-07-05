import { call } from 'redux-saga/effects';
import { createPaymentResource, PaymentToolType, ProviderType } from 'checkout/backend';

export function* createGooglePay(endpoint: string, gatewayMerchantID: string, paymentToken: PaymentData, token: string) {
    const paymentTool = {
        paymentToolType: PaymentToolType.TokenizedCardData,
        provider: ProviderType.GooglePay,
        gatewayMerchantID,
        paymentToken
    };
    return yield call(createPaymentResource, endpoint, token, paymentTool);
}
