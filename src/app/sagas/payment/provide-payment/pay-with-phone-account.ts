import { call, CallEffect } from 'redux-saga/effects';
import { AmountInfoState, ModelState, MobileFormValues } from 'checkout/state';
import { Config } from 'checkout/config';
import { createPhoneAccount } from '../../create-payment-resource';
import { makePayment } from './make-payment';

const createPaymentResource = (endpoint: string, formValues: MobileFormValues) =>
    createPhoneAccount.bind(null, endpoint, formValues);

export function* payWithPhoneAccount(
    c: Config,
    m: ModelState,
    a: AmountInfoState,
    v: MobileFormValues
): Iterator<CallEffect> {
    const fn = createPaymentResource(c.appConfig.capiEndpoint, v);
    yield call(makePayment, c, m, v, a, fn);
}
