import { call, CallEffect } from 'redux-saga/effects';
import { AmountInfoState, ConfigState, ModelState, PayableFormValues, PaymentMethodName } from 'checkout/state';
import { payWithApplePay } from './pay-with-apple-pay';
import { payWithBankCard } from './pay-with-bank-card';
import { payWithDigitalWalletQiwi } from './pay-with-digital-wallet-qiwi';
import { payWithTerminalEuroset } from './pay-with-terminal-euroset';
import { payWithGooglePay } from './pay-with-google-pay';
import { payWithSamsungPay } from './pay-with-samsung-pay';
import { payWithMobileCommerce } from './pay-with-mobile-commerce';
import { payWithTerminalQPS } from './pay-with-terminal-qps';
import { assertUnreachable } from 'checkout/utils';
import { payWithTerminalUzcard } from './pay-with-terminal-uzcard';
import { payWithYandexPay } from './pay-with-yandex-pay';

const getPayFn = (method: PaymentMethodName) => {
    switch (method) {
        case PaymentMethodName.ApplePay:
            return call.bind(null, payWithApplePay);
        case PaymentMethodName.GooglePay:
            return call.bind(null, payWithGooglePay);
        case PaymentMethodName.SamsungPay:
            return call.bind(null, payWithSamsungPay);
        case PaymentMethodName.YandexPay:
            return call.bind(null, payWithYandexPay);
        case PaymentMethodName.BankCard:
            return call.bind(null, payWithBankCard);
        case PaymentMethodName.DigitalWallet:
            return call.bind(null, payWithDigitalWalletQiwi);
        case PaymentMethodName.Euroset:
            return call.bind(null, payWithTerminalEuroset);
        case PaymentMethodName.Uzcard:
            return call.bind(null, payWithTerminalUzcard);
        case PaymentMethodName.QPS:
            return call.bind(null, payWithTerminalQPS);
        case PaymentMethodName.MobileCommerce:
            return call.bind(null, payWithMobileCommerce);
        default:
            assertUnreachable(method);
            throw { code: 'error.unsupported.payment.method' };
    }
};

export function* providePayment(
    method: PaymentMethodName,
    c: ConfigState,
    m: ModelState,
    a: AmountInfoState,
    v: PayableFormValues
): Iterator<CallEffect> {
    const values = v ? v : { amount: null, email: null };
    yield getPayFn(method)(c, m, a, values);
}
