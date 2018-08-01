import { call } from 'redux-saga/effects';
import { createTerminalEuroset } from '../../create-payment-resource';
import { ProvidePaymentEffects } from './provide-payment';
import { AmountInfoState, ModelState, PayableFormValues } from 'checkout/state';
import { Config } from 'checkout/config';
import { makePayment } from './make-payment';

const createPaymentResource = (endpoint: string) => createTerminalEuroset.bind(null, endpoint);

export function* payWithTerminalEuroset(
    c: Config,
    m: ModelState,
    a: AmountInfoState,
    v: PayableFormValues
): Iterator<ProvidePaymentEffects> {
    const fn = createPaymentResource(c.appConfig.capiEndpoint);
    return yield call(makePayment, c, m, v, a, fn);
}
