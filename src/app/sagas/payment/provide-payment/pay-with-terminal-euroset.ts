import { call } from 'redux-saga/effects';
import { createTerminalEuroset } from '../../create-payment-resource';
import { ProvidePaymentEffects } from './provide-payment';
import { ModelState, PayableFormValues } from 'checkout/state';
import { Config } from 'checkout/config';
import { Amount } from 'checkout/utils';
import { makePayment } from './make-payment';

const createPaymentResource = (endpoint: string) => createTerminalEuroset.bind(null, endpoint);

export function* payWithTerminalEuroset(c: Config, m: ModelState, v: PayableFormValues, amount: Amount): Iterator<ProvidePaymentEffects> {
    const fn = createPaymentResource(c.appConfig.capiEndpoint);
    return yield call(makePayment, c, m, v.email, amount, fn);
}
