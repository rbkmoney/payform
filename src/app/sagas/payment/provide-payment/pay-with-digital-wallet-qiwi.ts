import { call } from 'redux-saga/effects';
import { ModelState, WalletFormValues } from 'checkout/state';
import { Config } from 'checkout/config';
import { Amount } from 'checkout/utils';
import { ProvidePaymentEffects } from './provide-payment';
import { createDigitalWalletQiwi } from './create-payment-resource';
import { makePayment } from './make-payment';

const createPaymentResource = (endpoint: string, formValues: WalletFormValues) =>
    createDigitalWalletQiwi.bind(null, endpoint, formValues);

export function* payWithDigitalWalletQiwi(c: Config, m: ModelState, v: WalletFormValues, amount: Amount): Iterator<ProvidePaymentEffects> {
    const fn = createPaymentResource(c.appConfig.capiEndpoint, v);
    return yield call(makePayment, c, m, v.email, amount, fn);
}
