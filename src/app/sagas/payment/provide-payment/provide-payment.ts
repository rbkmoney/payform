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
import { payWithDigitalWalletQiwi } from './pay-with-digital-wallet-qiwi';
import { payWithTerminalEuroset } from './pay-with-terminal-euroset';
import { payWithGooglePay } from './pay-with-google-pay';

export type ProvidePaymentEffects = CallEffect | Event;

const getPayFn = (method: PaymentMethodName) => {
    switch (method) {
        case PaymentMethodName.ApplePay:
            return call.bind(null, payWithApplePay);
        case PaymentMethodName.GooglePay:
            return call.bind(null, payWithGooglePay);
        case PaymentMethodName.BankCard:
            return call.bind(null, payWithBankCard);
        case PaymentMethodName.DigitalWallet:
            return call.bind(null, payWithDigitalWalletQiwi);
        case PaymentMethodName.PaymentTerminal:
            return call.bind(null, payWithTerminalEuroset);
        default:
            throw {code: 'error.unsupported.payment.method'};
    }
};

export function* providePayment(method: PaymentMethodName, c: ConfigState, m: ModelState, v?: PayableFormValues): Iterator<ProvidePaymentEffects> {
    const values = v ? v : {amount: null, email: null};
    const amountInfo = getAmountInfo(m, c.initConfig.amount, values.amount);
    return yield getPayFn(method)(c, m, values, amountInfo);
}
