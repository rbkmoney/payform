import { CallEffect } from 'redux-saga/effects';
import { AmountInfoState, ModelState, TokenProviderFormValues } from 'checkout/state';
import { Config } from 'checkout/config';

export function* payWithYandexPay(
    c: Config,
    m: ModelState,
    a: AmountInfoState,
    v: TokenProviderFormValues
): Iterator<CallEffect> {
    console.log(c, m, a, v);
    throw new Error('Unimplemented');
    return null;
}
