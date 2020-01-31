import { call } from 'redux-saga/effects';
import { providePayment } from '.';
import { payWithApplePay } from './pay-with-apple-pay';
import { PaymentMethodName } from 'checkout/state';
import { payWithGooglePay } from './pay-with-google-pay';
import { payWithSamsungPay } from './pay-with-samsung-pay';
import { payWithBankCard } from './pay-with-bank-card';
import { payWithDigitalWalletQiwi } from './pay-with-digital-wallet-qiwi';
import { payWithTerminalEuroset } from './pay-with-terminal-euroset';

describe('providePayment', () => {
    const c = 'ConfigStateMock' as any;
    const m = 'ModelStateMock' as any;
    const a = 'AmountInfoStateMock' as any;
    const v = 'PayableFormValuesMock' as any;
    const values = v ? v : { amount: null, email: null };
    
    it('provide payment with ApplePay', () => {
        const method = PaymentMethodName.ApplePay;
        const iterator = providePayment(method, c, m, a, v);
        const actual = iterator.next().value;
        const expected = call(payWithApplePay, c, m, a, values);
        expect(actual).toEqual(expected);
    });

    it('provide payment with GooglePay', () => {
        const method = PaymentMethodName.GooglePay;
        const iterator = providePayment(method, c, m, a, v);
        const actual = iterator.next().value;
        const expected = call(payWithGooglePay, c, m, a, values);
        expect(actual).toEqual(expected);
    });

    it('provide payment with BankCard', () => {
        const method = PaymentMethodName.SamsungPay;
        const iterator = providePayment(method, c, m, a, v);
        const actual = iterator.next().value;
        const expected = call(payWithSamsungPay, c, m, a, values);
        expect(actual).toEqual(expected);
    });

    it('provide payment with BankCard', () => {
        const method = PaymentMethodName.BankCard;
        const iterator = providePayment(method, c, m, a, v);
        const actual = iterator.next().value;
        const expected = call(payWithBankCard, c, m, a, values);
        expect(actual).toEqual(expected);
    });

    it('provide payment with DigitalWallet', () => {
        const method = PaymentMethodName.DigitalWallet;
        const iterator = providePayment(method, c, m, a, v);
        const actual = iterator.next().value;
        const expected = call(payWithDigitalWalletQiwi, c, m, a, values);
        expect(actual).toEqual(expected);
    });

    it('provide payment with PaymentTerminal', () => {
        const method = PaymentMethodName.PaymentTerminal;
        const iterator = providePayment(method, c, m, a, v);
        const actual = iterator.next().value;
        const expected = call(payWithTerminalEuroset, c, m, a, values);
        expect(actual).toEqual(expected);
    });
});
