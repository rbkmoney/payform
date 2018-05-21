import { call, put } from 'redux-saga/effects';
import {
    bankCardToMethods,
    toAvailablePaymentMethods,
    setPriority,
    initializeAvailablePaymentMethods
} from './initialize-available-payment-methods';
import {
    BankCard,
    PaymentMethod, AppConfig
} from 'checkout/backend';
import { Config } from 'checkout/config';
import { PaymentMethod as PaymentMethodState } from 'checkout/state';
import { TypeKeys } from 'checkout/actions';
import { isPaymentRequestAvailable } from '../../../../environment';
import { isReadyToApplePay } from './is-ready-to-apple-pay';

const merchantID = 'merchant.money.rbk.checkout';

const appConfig = {
    applePayMerchantID: merchantID
} as AppConfig;

const bankCard = {
    method: 'BankCard',
    paymentSystems: ['mastercard', 'nspkmir', 'visa', 'visaelectron']
} as BankCard;

const applePay = {
    method: 'BankCard',
    paymentSystems: ['mastercard', 'visa'],
    tokenProviders: ['applepay']
} as BankCard;

const googlePay = {
    method: 'BankCard',
    paymentSystems: ['mastercard', 'visa'],
    tokenProviders: ['googlepay']
} as BankCard;

jest.mock('../../../../environment');

describe('bankCardToMethods', () => {
    describe('without token providers', () => {
        const iterator = bankCardToMethods(bankCard, appConfig, false);

        it('should return card payment methods', () => {
            const actual = iterator.next(true);
            const expected = {name: 'BankCard'};
            expect(actual.value).toEqual(expected);
            expect(actual.done).toBeTruthy();
        });
    });

    describe('with apple pay', () => {
        const iterator = bankCardToMethods(applePay, {
            applePayMerchantID: merchantID
        } as AppConfig, false);

        it('should call isReadyToApplePay', () => {
            const actual = iterator.next().value;
            const expected = call(isReadyToApplePay, merchantID, false);
            expect(actual).toEqual(expected);
        });

        it('should return card payment methods', () => {
            const actual = iterator.next(true);
            const expected = {name: 'ApplePay'};
            expect(actual.value).toEqual(expected);
            expect(actual.done).toBeTruthy();
        });
    });

    describe('with google pay', () => {
        const isGooglePayAvailableMock = isPaymentRequestAvailable as any;
        const iterator = bankCardToMethods(googlePay, null, false);

        it('should return card payment methods', () => {
            isGooglePayAvailableMock.mockReturnValueOnce(true);
            const actual = iterator.next();
            const expected = {name: 'GooglePay'};
            expect(actual.value).toEqual(expected);
            expect(actual.done).toBeTruthy();
        });
    });
});

describe('toAvailablePaymentMethods', () => {
    const paymentMethods = [
        bankCard,
        applePay,
        {
            method: 'DigitalWallet',
            providers: ['qiwi']
        },
        {
            method: 'PaymentTerminal',
            providers: ['euroset']
        }
    ] as PaymentMethod[];

    describe('truthy wallets and terminals flags', () => {
        const config = {
            initConfig: {
                wallets: true,
                terminals: true
            },
            inFrame: false,
            appConfig
        } as Config;

        const iterator = toAvailablePaymentMethods(paymentMethods, config);

        it('should call bankCardToMethods with bankCard', () => {
            const actual = iterator.next().value;
            const expected = call(bankCardToMethods, bankCard, appConfig, false);
            expect(actual).toEqual(expected);
        });

        it('should call bankCardToMethods with applePay', () => {
            const actual = iterator.next({name: 'BankCard'}).value;
            const expected = call(bankCardToMethods, applePay, appConfig, false);
            expect(actual).toEqual(expected);
        });

        it('should return PaymentMethodState[]', () => {
            const actual = iterator.next({name: 'ApplePay'});
            const expected = [
                {name: 'BankCard'},
                {name: 'ApplePay'},
                {name: 'DigitalWallet'},
                {name: 'PaymentTerminal'}
            ];
            expect(actual.value).toEqual(expected);
            expect(actual.done).toBeTruthy();
        });
    });

    describe('falsy wallets and terminals flags', () => {
        const config = {
            initConfig: {
                wallets: false,
                terminals: false
            },
            inFrame: true,
            appConfig
        } as Config;

        const iterator = toAvailablePaymentMethods(paymentMethods, config);

        it('should call bankCardToMethods with bankCard', () => {
            const actual = iterator.next().value;
            const expected = call(bankCardToMethods, bankCard, appConfig, true);
            expect(actual).toEqual(expected);
        });

        it('should call bankCardToMethods', () => {
            const actual = iterator.next({name: 'BankCard'}).value;
            const expected = call(bankCardToMethods, applePay, appConfig, true);
            expect(actual).toEqual(expected);
        });

        it('should return PaymentMethodState[]', () => {
            const actual = iterator.next({name: 'ApplePay'});
            const expected = [
                {name: 'BankCard'},
                {name: 'ApplePay'}
            ];
            expect(actual.value).toEqual(expected);
            expect(actual.done).toBeTruthy();
        });
    });
});

describe('setPriority', () => {
    it('should set priority', () => {
        const methodsState = [
            {name: 'ApplePay'},
            {name: 'BankCard'},
            {name: 'DigitalWallet'},
            {name: 'PaymentTerminal'}
        ] as PaymentMethodState[];
        const actual = setPriority(methodsState);
        const expected = [
            {name: 'ApplePay', priority: 1},
            {name: 'BankCard', priority: 2},
            {name: 'DigitalWallet', priority: 3},
            {name: 'PaymentTerminal', priority: 4}
        ];
        expect(actual).toEqual(expected);
    });
});

describe('initializeAvailablePaymentMethods', () => {
    const methods = 'methodMock' as any;
    const config = 'configMock' as any;
    const iterator = initializeAvailablePaymentMethods(methods, config);

    it('should call toAvailablePaymentMethods', () => {
        const actual = iterator.next().value;
        const expected = call(toAvailablePaymentMethods, methods, config);
        expect(actual).toEqual(expected);
    });

    it('should call setPriority', () => {
        const methodsState = 'methodsStateMock' as any;
        const actual = iterator.next(methodsState).value;
        const expected = call(setPriority, methodsState);
        expect(actual).toEqual(expected);
    });

    it('should put to action', () => {
        const prioritizedMethods = 'prioritizedMethodsMock';
        const actual = iterator.next(prioritizedMethods).value;
        const expected = put({
            type: TypeKeys.INITIALIZE_AVAILABLE_PAYMENT_METHODS_COMPLETED,
            payload: prioritizedMethods
        });
        expect(actual).toEqual(expected);
    });
});
