import { call } from 'redux-saga/effects';
import { CardFormValues, ModelState } from 'checkout/state';
import { Config } from 'checkout/config';
import { createCardData } from './create-payment-resource';
import { makePayment } from './make-payment';
import { Amount } from 'checkout/utils';
import { ProvidePaymentEffects } from './provide-payment';

const createPaymentResource = (endpoint: string, formValues: CardFormValues) => {
    const {cardNumber, expireDate, secureCode, cardHolder} = formValues;
    return createCardData.bind(null, endpoint, {cardNumber, expireDate, secureCode, cardHolder});
};

export function* payWithBankCard(c: Config, m: ModelState, v: CardFormValues, amount: Amount): Iterator<ProvidePaymentEffects> {
    const fn = createPaymentResource(c.appConfig.capiEndpoint, v);
    return yield call(makePayment, c, m, v.email, amount, fn);
}
