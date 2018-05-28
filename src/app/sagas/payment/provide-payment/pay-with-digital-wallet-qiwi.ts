import { call } from 'redux-saga/effects';
import { AmountInfoState, ModelState, WalletFormValues } from 'checkout/state';
import { Config } from 'checkout/config';
import { ProvidePaymentEffects } from './provide-payment';
import { createDigitalWalletQiwi } from '../../create-payment-resource';
import { makePayment } from './make-payment';

const createPaymentResource = (endpoint: string, formValues: WalletFormValues) =>
    createDigitalWalletQiwi.bind(null, endpoint, formValues);

export function* payWithDigitalWalletQiwi(c: Config, m: ModelState, a: AmountInfoState, v: WalletFormValues): Iterator<ProvidePaymentEffects> {
    const fn = createPaymentResource(c.appConfig.capiEndpoint, v);
    return yield call(makePayment, c, m, v, a, fn);
}
