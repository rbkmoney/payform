import { call, CallEffect } from 'redux-saga/effects';
import { AmountInfoState, ModelState, PayableFormValues } from 'checkout/state';
import { Config } from 'checkout/config';
import { makePayment } from './make-payment';
import { createTerminalQPS } from '../../create-payment-resource';

const createPaymentResource = (endpoint: string) => createTerminalQPS.bind(null, endpoint);

export function* payWithTerminalQPS(
    c: Config,
    m: ModelState,
    a: AmountInfoState,
    v: PayableFormValues
): Iterator<CallEffect> {
    const fn = createPaymentResource(c.appConfig.capiEndpoint);
    yield call(makePayment, c, m, v, a, fn);
}
