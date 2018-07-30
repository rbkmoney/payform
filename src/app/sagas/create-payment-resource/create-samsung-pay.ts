import { call } from 'redux-saga/effects';
import { createPaymentResource, PaymentToolType, ProviderType } from 'checkout/backend';

export function* createSamsungPay(endpoint: string, referenceID: string, serviceID: string, token: string) {
    const paymentTool = {
        paymentToolType: PaymentToolType.TokenizedCardData,
        provider: ProviderType.SamsungPay,
        referenceID,
        serviceID
    };
    return yield call(createPaymentResource, endpoint, token, paymentTool);
}
