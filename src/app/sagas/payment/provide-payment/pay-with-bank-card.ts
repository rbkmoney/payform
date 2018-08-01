import { call } from 'redux-saga/effects';
import { AmountInfoState, CardFormValues, ModelState } from 'checkout/state';
import { Config } from 'checkout/config';
import { createCardData } from '../../create-payment-resource';
import { makePayment } from './make-payment';
import { ProvidePaymentEffects } from './provide-payment';

const createPaymentResource = (endpoint: string, formValues: CardFormValues) =>
    createCardData.bind(null, endpoint, formValues);

export function* payWithBankCard(
    c: Config,
    m: ModelState,
    a: AmountInfoState,
    v: CardFormValues
): Iterator<ProvidePaymentEffects> {
    const fn = createPaymentResource(c.appConfig.capiEndpoint, v);
    return yield call(makePayment, c, m, v, a, fn);
}
