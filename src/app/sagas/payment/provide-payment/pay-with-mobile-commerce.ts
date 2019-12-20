import { call, CallEffect } from 'redux-saga/effects';
import { AmountInfoState, ModelState, MobileCommerceFormValues } from 'checkout/state';
import { Config } from 'checkout/config';
import { createMobileCommerce } from '../../create-payment-resource';
import { makePayment } from './make-payment';

const createPaymentResource = (endpoint: string, formValues: MobileCommerceFormValues) =>
    createMobileCommerce.bind(null, endpoint, formValues);

export function* payWithMobileCommerce(
    c: Config,
    m: ModelState,
    a: AmountInfoState,
    v: MobileCommerceFormValues
): Iterator<CallEffect> {
    const fn = createPaymentResource(c.appConfig.capiEndpoint, v);
    yield call(makePayment, c, m, v, a, fn);
}
