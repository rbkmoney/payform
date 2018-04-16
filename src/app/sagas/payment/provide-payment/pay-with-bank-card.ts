import { call } from 'redux-saga/effects';
import { CardFormValues, ModelState } from 'checkout/state';
import { Config } from 'checkout/config';
import { createCardData } from './create-payment-resource';
import { makeAbstractPayment } from './abstract-payment';
import { Amount } from 'checkout/utils';
import { ProvidePaymentEffects } from './provide-payment';

const createPaymentResource = (endpoint: string, formValues: CardFormValues) => {
    const {cardNumber, expireDate, secureCode, cardHolder} = formValues;
    return createCardData.bind(null, endpoint, {cardNumber, expireDate, secureCode, cardHolder});
};

export function* payWithBankCard(config: Config, model: ModelState, formValues: CardFormValues, amountInfo: Amount): Iterator<ProvidePaymentEffects> {
    const fn = createPaymentResource(config.appConfig.capiEndpoint, formValues);
    return yield call(makeAbstractPayment, config, model, formValues.email, amountInfo, fn);
}
