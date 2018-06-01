import { call } from 'redux-saga/effects';
import { createPaymentResource, PaymentToolType, ProviderType } from 'checkout/backend';

export function* createGooglePay(endpoint: string, merchantID: string, paymentToken: PaymentData, token: string) {
    const paymentTool = {
        paymentToolType: PaymentToolType.TokenizedCardData,
        provider: ProviderType.GooglePay,
        merchantID,
        paymentToken
    };
    return yield call(createPaymentResource, endpoint, token, paymentTool);
}
