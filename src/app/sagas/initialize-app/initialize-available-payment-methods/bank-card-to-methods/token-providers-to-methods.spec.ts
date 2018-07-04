import { call } from 'redux-saga/effects';
import { tokenProvidersToMethods } from './token-providers-to-methods';
import { BankCardTokenProvider } from 'checkout/backend';
import { PaymentMethodName as PaymentMethodNameState } from 'checkout/state';
import { isReadyToApplePay } from './is-ready-to-apple-pay';
import { isReadyToGooglePay } from './is-ready-to-google-pay';
import { isReadyToSamsungPay } from './is-ready-to-samsung-pay';

const amountInfo = 'amountInfoMock' as any;

describe('Apple Pay provider', () => {
    const providers = [BankCardTokenProvider.applepay];
    const config = {
        appConfig: {
            applePayMerchantID: 'merchantIdMock'
        },
        inFrame: false
    } as any;

    describe('apple pay available', () => {
        const iterator = tokenProvidersToMethods(providers, config, amountInfo);

        it('should call isReadyToApplePay', () => {
            const actual = iterator.next().value;
            const expected = call(isReadyToApplePay, config.appConfig.applePayMerchantID, config.inFrame);
            expect(actual).toEqual(expected);
        });

        it('should return PaymentMethodNameState ApplePay', () => {
            const actual = iterator.next(true);
            const expected = [{name: PaymentMethodNameState.ApplePay}];
            expect(actual.value).toEqual(expected);
            expect(actual.done).toBeTruthy();
        });
    });

    describe('apple pay unavailable', () => {
        const iterator = tokenProvidersToMethods(providers, config, amountInfo);

        it('should call isReadyToApplePay', () => {
            const actual = iterator.next().value;
            const expected = call(isReadyToApplePay, config.appConfig.applePayMerchantID, config.inFrame);
            expect(actual).toEqual(expected);
        });

        it('should return []', () => {
            const actual = iterator.next(false);
            expect(actual.value).toEqual([]);
            expect(actual.done).toBeTruthy();
        });
    });
});

describe('Google Pay provider', () => {
    const providers = [BankCardTokenProvider.googlepay];

    describe('google pay available', () => {
        const iterator = tokenProvidersToMethods(providers, null, amountInfo);

        it('should call isReadyToGooglePay', () => {
            const actual = iterator.next().value;
            const expected = call(isReadyToGooglePay, amountInfo);
            expect(actual).toEqual(expected);
        });

        it('should return PaymentMethodNameState GooglePay', () => {
            const actual = iterator.next(true);
            const expected = [{name: PaymentMethodNameState.GooglePay}];
            expect(actual.value).toEqual(expected);
            expect(actual.done).toBeTruthy();
        });
    });

    describe('google pay unavailable', () => {
        const iterator = tokenProvidersToMethods(providers, null, amountInfo);

        it('should call isReadyToGooglePay', () => {
            const actual = iterator.next().value;
            const expected = call(isReadyToGooglePay, amountInfo);
            expect(actual).toEqual(expected);
        });

        it('should return []', () => {
            const actual = iterator.next(false);
            expect(actual.value).toEqual([]);
            expect(actual.done).toBeTruthy();
        });
    });
});

describe('Samsung Pay provider', () => {
    const providers = [BankCardTokenProvider.samsungpay];

    describe('samsung pay available', () => {
        const iterator = tokenProvidersToMethods(providers, null, amountInfo);

        it('should call isReadyToSamsungPay', () => {
            const actual = iterator.next().value;
            const expected = call(isReadyToSamsungPay, amountInfo);
            expect(actual).toEqual(expected);
        });

        it('should return PaymentMethodNameState SamsungPay', () => {
            const actual = iterator.next(true);
            const expected = [{name: PaymentMethodNameState.SamsungPay}];
            expect(actual.value).toEqual(expected);
            expect(actual.done).toBeTruthy();
        });
    });

    describe('samsung pay unavailable', () => {
        const iterator = tokenProvidersToMethods(providers, null, amountInfo);

        it('should call isReadyToSamsungPay', () => {
            const actual = iterator.next().value;
            const expected = call(isReadyToSamsungPay, amountInfo);
            expect(actual).toEqual(expected);
        });

        it('should return []', () => {
            const actual = iterator.next(false);
            expect(actual.value).toEqual([]);
            expect(actual.done).toBeTruthy();
        });
    });
});
