import { call, CallEffect } from 'redux-saga/effects';
import { createTerminalUzcard } from '../../create-payment-resource';
import { AmountInfoState, ModelState, PayableFormValues } from 'checkout/state';
import { Config } from 'checkout/config';
import { makePayment } from './make-payment';

export const createPaymentResource = (endpoint: string) => createTerminalUzcard.bind(null, endpoint);

export function* payWithTerminalUzcard(
    c: Config,
    m: ModelState,
    a: AmountInfoState,
    v: PayableFormValues
): Iterator<CallEffect> {
    const fn = createPaymentResource(c.appConfig.capiEndpoint);
    yield call(makePayment, c, m, v, a, fn);
}
