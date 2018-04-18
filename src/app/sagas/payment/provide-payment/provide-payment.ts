import { call, CallEffect } from 'redux-saga/effects';
import {
    ConfigState,
    ModelState,
    PayableFormValues,
    PaymentMethodName
} from 'checkout/state';
import { payWithApplePay } from './pay-with-apple-pay';
import { payWithBankCard } from './pay-with-bank-card';
import { Amount } from 'checkout/utils';
import { Event } from 'checkout/backend';

export type ProvidePaymentEffects = CallEffect | Event[];

const getPayFn = (method: PaymentMethodName) => {
    switch (method) {
        case PaymentMethodName.ApplePay:
            return call.bind(null, payWithApplePay);
        case PaymentMethodName.BankCard:
            return call.bind(null, payWithBankCard);
        default:
            throw {code: 'unsupported.payment.method'};
    }
};

export function* providePayment(method: PaymentMethodName, c: ConfigState, m: ModelState, v: PayableFormValues, amount: Amount): Iterator<ProvidePaymentEffects> {
    return yield getPayFn(method)(c, m, v, amount);
}
