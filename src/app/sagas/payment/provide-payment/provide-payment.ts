import { call, CallEffect } from 'redux-saga/effects';
import { PaymentMethodName } from 'checkout/state';
import { PaymentRequestedPayload } from 'checkout/actions';
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
    }
};

export function* providePayment(payload: PaymentRequestedPayload, amountInfo: Amount): Iterator<ProvidePaymentEffects> {
    const {method, config, model, values} = payload;
    const pay = getPayFn(method);
    return yield pay(config, model, values, amountInfo);
}
