import { call, CallEffect } from 'redux-saga/effects';
import { AmountInfoState, ModelState, TokenProviderFormValues } from 'checkout/state';
import { Config } from 'checkout/config';
import { makePayment } from '../make-payment';
import { getPaymentData } from './get-payment-data';
import { createGooglePay } from '../../../create-payment-resource';

export const createPaymentResource = (endpoint: string, googlePayMerchantID: string, paymentData: PaymentData) =>
    createGooglePay.bind(null, endpoint, googlePayMerchantID, paymentData);

export function* payWithGooglePay(
    c: Config,
    m: ModelState,
    a: AmountInfoState,
    v: TokenProviderFormValues
): Iterator<CallEffect> {
    const {
        appConfig: { googlePayMerchantID, googlePayGatewayMerchantID, capiEndpoint }
    } = c;
    const paymentData = yield call(getPaymentData, googlePayMerchantID, googlePayGatewayMerchantID, a, v.amount);
    const fn = createPaymentResource(capiEndpoint, googlePayGatewayMerchantID, paymentData);
    yield call(makePayment, c, m, v, a, fn);
}
