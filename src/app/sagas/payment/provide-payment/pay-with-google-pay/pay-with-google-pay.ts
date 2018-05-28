import { call } from 'redux-saga/effects';
import { AmountInfoState, ModelState, TokenProviderFormValues } from 'checkout/state';
import { Config } from 'checkout/config';
import { createCardData } from '../../../create-payment-resource';
import { makePayment } from '../make-payment';
import { getPaymentData } from './get-payment-data';
import { ProvidePaymentEffects } from '../provide-payment';

const createPaymentResource = (endpoint: string) =>
    createCardData.bind(null, endpoint, {
        cardNumber: '4242424242424242',
        expireDate: '12/20',
        secureCode: '123',
        cardHolder: 'LEXA SVOTIN'
    });

export function* payWithGooglePay(c: Config, m: ModelState, a: AmountInfoState, v: TokenProviderFormValues): Iterator<ProvidePaymentEffects> {
    const {appConfig: {googlePayMerchantID, capiEndpoint}} = c;
    const paymentData = yield call(getPaymentData, googlePayMerchantID, a);
    console.info('PaymentData', paymentData);
    const fn = createPaymentResource(capiEndpoint);
    return yield call(makePayment, c, m, v, a, fn);
}
