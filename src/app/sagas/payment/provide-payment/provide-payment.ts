import { call, CallEffect } from 'redux-saga/effects';
import {
    ConfigState,
    ModelState,
    PayableFormValues,
    PaymentMethodName
} from 'checkout/state';
import { payWithApplePay } from './pay-with-apple-pay';
import { payWithBankCard } from './pay-with-bank-card';
import { Event } from 'checkout/backend';
import { getAmountInfo } from '../get-amount-info';

export type ProvidePaymentEffects = CallEffect | Event;

const getPayFn = (method: PaymentMethodName) => {
    switch (method) {
        case PaymentMethodName.ApplePay:
            return call.bind(null, payWithApplePay);
        case PaymentMethodName.BankCard:
            return call.bind(null, payWithBankCard);
        default:
            throw {code: 'error.unsupported.payment.method'};
    }
};

export function* providePayment(method: PaymentMethodName, c: ConfigState, m: ModelState, v?: PayableFormValues): Iterator<ProvidePaymentEffects> {
    const values = v ? v : {amount: null, email: null};
    const amountInfo = getAmountInfo(m, c.initConfig.amount, values.amount);
    return yield getPayFn(method)(c, m, values, amountInfo);
}
