import { call } from 'redux-saga/effects';
import { createPaymentResource, PaymentToolType, ProviderType } from 'checkout/backend';

export interface SamsungPayPaymentData {
    refId: string;
}

export function* createSamsungPay(endpoint: string, paymentData: SamsungPayPaymentData, token: string) {
    const paymentTool = {
        paymentToolType: PaymentToolType.TokenizedCardData,
        provider: ProviderType.SamsungPay,
        paymentData
    };
    return yield call(createPaymentResource, endpoint, token, paymentTool);
}
