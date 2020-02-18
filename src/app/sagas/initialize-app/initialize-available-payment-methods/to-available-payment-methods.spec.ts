import { call } from 'redux-saga/effects';
import { PaymentMethodName, PaymentMethod, PaymentMethodGroupName } from 'checkout/state';
import { toAvailablePaymentMethods } from './to-available-payment-methods';
import { BankCard, DigitalWallet, PaymentTerminal } from 'checkout/backend';
import { bankCardToMethods } from './bank-card-to-methods';

const bankCardState = { name: PaymentMethodName.BankCard };
const amountInfo = 'amountInfoMock' as any;

const bankCard = {
    method: 'BankCard',
    paymentSystems: ['mastercard', 'nspkmir', 'visa', 'visaelectron']
} as BankCard;
const digitalWallet = {
    method: 'DigitalWallet'
} as DigitalWallet;
const paymentTerminal = {
    method: 'PaymentTerminal',
    providers: ['euroset']
} as PaymentTerminal;

describe('All payment methods', () => {
    const config = {
        initConfig: {
            bankCard: true,
            wallets: true,
            terminals: true
        }
    } as any;
    const paymentMethods = [bankCard, digitalWallet, paymentTerminal];
    const iterator = toAvailablePaymentMethods(paymentMethods, config, amountInfo);

    it('should call bankCardToMethods', () => {
        const actual = iterator.next().value;
        const expected = call(bankCardToMethods, bankCard, config, amountInfo);
        expect(actual).toEqual(expected);
    });

    it('should return PaymentMethodState with DigitalWallet, PaymentTerminal', () => {
        const actual = iterator.next({ name: PaymentMethodName.BankCard });
        const expected = [
            { name: PaymentMethodName.BankCard },
            { name: PaymentMethodName.DigitalWallet },
            { name: PaymentMethodGroupName.Terminals, children: [{ name: PaymentMethodName.Euroset }] }
        ];
        expect(actual.value).toEqual(expected);
        expect(actual.done).toBeTruthy();
    });
});

describe('BankCard', () => {
    const config = {
        initConfig: {
            bankCard: true
        },
        appConfig: {
            brandless: false
        }
    } as any;
    const iterator = toAvailablePaymentMethods([bankCard], config, amountInfo);

    it('should call bankCardToMethods', () => {
        const actual = iterator.next().value;
        const expected = call(bankCardToMethods, bankCard, config, amountInfo);
        expect(actual).toEqual(expected);
    });

    it('should iterator done', () => {
        const actual = iterator.next().done;
        expect(actual).toBeTruthy();
    });
});

describe('DigitalWallet', () => {
    const paymentMethods = [digitalWallet];

    describe('config with truthy wallets', () => {
        const config = {
            initConfig: {
                wallets: true
            },
            appConfig: {
                brandless: false
            }
        } as any;
        const iterator = toAvailablePaymentMethods(paymentMethods, config, amountInfo);

        it('should return PaymentMethodState with DigitalWallet', () => {
            const actual = iterator.next();
            const expected = [{ name: PaymentMethodName.DigitalWallet }];
            expect(actual.value).toEqual(expected);
            expect(actual.done).toBeTruthy();
        });
    });

    describe('config with falsy wallets', () => {
        const config = {
            initConfig: {
                wallets: false
            },
            appConfig: {
                brandless: false
            }
        } as any;
        const iterator = toAvailablePaymentMethods(paymentMethods, config, amountInfo);

        it('should return PaymentMethodState without DigitalWallet', () => {
            const actual = iterator.next([bankCardState]);
            expect(actual.value).toEqual([{ name: PaymentMethodName.BankCard }]);
            expect(actual.done).toBeTruthy();
        });
    });
});

describe('PaymentTerminal', () => {
    const paymentMethods = [paymentTerminal];

    describe('config with truthy terminals', () => {
        const config = {
            initConfig: {
                terminals: true
            },
            appConfig: {
                brandless: false
            }
        } as any;
        const iterator = toAvailablePaymentMethods(paymentMethods, config, amountInfo);

        it('should return PaymentMethodState with Euroset', () => {
            const actual = iterator.next();
            const expected: PaymentMethod[] = [
                { name: PaymentMethodGroupName.Terminals, children: [{ name: PaymentMethodName.Euroset }] }
            ];
            expect(actual.value).toEqual(expected);
            expect(actual.done).toBeTruthy();
        });
    });

    describe('config with truthy terminals and truthy paymentFlowHold', () => {
        const config = {
            initConfig: {
                terminals: true,
                paymentFlowHold: true
            },
            appConfig: {
                brandless: false
            }
        } as any;
        const iterator = toAvailablePaymentMethods(paymentMethods, config, amountInfo);

        it('should return PaymentMethodState without PaymentTerminal', () => {
            const actual = iterator.next();
            const expected = [{ name: PaymentMethodName.BankCard }];
            expect(actual.value).toEqual(expected);
            expect(actual.done).toBeTruthy();
        });
    });

    describe('config with falsy terminals', () => {
        const config = {
            initConfig: {
                terminals: false
            },
            appConfig: {
                brandless: false
            }
        } as any;
        const iterator = toAvailablePaymentMethods(paymentMethods, config, amountInfo);

        it('should return PaymentMethodState without PaymentTerminal', () => {
            const actual = iterator.next();
            expect(actual.value).toEqual([{ name: PaymentMethodName.BankCard }]);
            expect(actual.done).toBeTruthy();
        });
    });
});
