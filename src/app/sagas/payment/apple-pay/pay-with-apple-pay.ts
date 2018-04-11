import { call } from 'redux-saga/effects';
import { ModelState, TokenProviderFormValues } from 'checkout/state';
import { Config } from 'checkout/config';
import { beginSession } from './begin-session';
import { getAmountInfo } from '../get-amount-info';
import { createSession } from './create-session';

export function* payWithApplePay(c: Config, m: ModelState, v: TokenProviderFormValues): any {
    const {amount, description} = c.initConfig;
    const {currencyCode, value} = getAmountInfo(m, amount, v.amount);
    const session = createSession(description, currencyCode, value);
    const applePayPayment = yield call(beginSession, c, session);
    return;
}
