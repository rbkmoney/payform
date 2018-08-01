import { call } from 'redux-saga/effects';
import { AmountInfoState, ModelState, TokenProviderFormValues } from 'checkout/state';
import { Config } from 'checkout/config';
import { makePayment } from '../make-payment';
import { getPaymentData } from './get-payment-data';
import { ProvidePaymentEffects } from '../provide-payment';
import { createGooglePay } from '../../../create-payment-resource';

const createPaymentResource = (endpoint: string, googlePayMerchantID: string, paymentData: PaymentData) =>
    createGooglePay.bind(null, endpoint, googlePayMerchantID, paymentData);

export function* payWithGooglePay(
    c: Config,
    m: ModelState,
    a: AmountInfoState,
    v: TokenProviderFormValues
): Iterator<ProvidePaymentEffects> {
    const {
        appConfig: { googlePayMerchantID, googlePayGatewayMerchantID, capiEndpoint }
    } = c;
    const paymentData = yield call(getPaymentData, googlePayMerchantID, googlePayGatewayMerchantID, a, v.amount);
    const fn = createPaymentResource(capiEndpoint, googlePayGatewayMerchantID, paymentData);
    return yield call(makePayment, c, m, v, a, fn);
}
