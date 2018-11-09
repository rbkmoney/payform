import { call } from 'redux-saga/effects';
import { PaymentMethodName as PaymentMethodNameState } from 'checkout/state';
import { toAvailablePaymentMethods } from './to-available-payment-methods';
import { BankCard, DigitalWallet, PaymentTerminal } from 'checkout/backend';
import { bankCardToMethods } from './bank-card-to-methods';

const bankCardState = { name: PaymentMethodNameState.BankCard };
const amountInfo = 'amountInfoMock' as any;

const bankCard = {
    method: 'BankCard',
    paymentSystems: ['mastercard', 'nspkmir', 'visa', 'visaelectron']
} as BankCard;
const digitalWallet = {
    method: 'DigitalWallet'
} as DigitalWallet;
const paymentTerminal = {
    method: 'PaymentTerminal'
} as PaymentTerminal;

// describe('All payment methods', () => {
//     const config = {
//         initConfig: {
//             bankCard: true,
//             wallets: true,
//             terminals: true
//         }
//     } as any;
//     const paymentMethods = [bankCard, digitalWallet, paymentTerminal];
//     const iterator = toAvailablePaymentMethods(paymentMethods, config, amountInfo);
//
//     it('should call bankCardToMethods', () => {
//         const actual = iterator.next().value;
//         const expected = call(bankCardToMethods, bankCard, config, amountInfo);
//         expect(actual).toEqual(expected);
//     });
//
//     it('should return PaymentMethodState with DigitalWallet, PaymentTerminal', () => {
//         const actual = iterator.next({ name: PaymentMethodNameState.BankCard });
//         const expected = [
//             { name: PaymentMethodNameState.BankCard },
//             { name: PaymentMethodNameState.DigitalWallet },
//             { name: PaymentMethodNameState.PaymentTerminal }
//         ];
//         expect(actual.value).toEqual(expected);
//         expect(actual.done).toBeTruthy();
//     });
// });

describe('BankCard', () => {
    const config = {
        initConfig: {
            bankCard: true
        }
    } as any;
    const iterator = toAvailablePaymentMethods([bankCard], config, amountInfo);

    // it('should call bankCardToMethods', () => {
    //     const actual = iterator.next().value;
    //     const expected = call(bankCardToMethods, bankCard, config, amountInfo);
    //     expect(actual).toEqual(expected);
    // });

    it('should iterator done', () => {
        const actual = iterator.next().done;
        expect(actual).toBeTruthy();
    });
});

describe('DigitalWallet', () => {
    const paymentMethods = [digitalWallet];

    // describe('config with truthy wallets', () => {
    //     const config = {
    //         initConfig: {
    //             wallets: true
    //         }
    //     } as any;
    //     const iterator = toAvailablePaymentMethods(paymentMethods, config, amountInfo);
    //
    //     it('should return PaymentMethodState with DigitalWallet', () => {
    //         const actual = iterator.next();
    //         const expected = [{ name: PaymentMethodNameState.DigitalWallet }];
    //         expect(actual.value).toEqual(expected);
    //         expect(actual.done).toBeTruthy();
    //     });
    // });

    describe('config with falsy wallets', () => {
        const config = {
            initConfig: {
                wallets: false
            }
        } as any;
        const iterator = toAvailablePaymentMethods(paymentMethods, config, amountInfo);

        it('should return PaymentMethodState without DigitalWallet', () => {
            const actual = iterator.next([bankCardState]);
            expect(actual.value).toEqual([{ name: PaymentMethodNameState.BankCard }]);
            expect(actual.done).toBeTruthy();
        });
    });
});

describe('PaymentTerminal', () => {
    const paymentMethods = [paymentTerminal];

    // describe('config with truthy terminals', () => {
    //     const config = {
    //         initConfig: {
    //             terminals: true
    //         }
    //     } as any;
    //     const iterator = toAvailablePaymentMethods(paymentMethods, config, amountInfo);
    //
    //     it('should return PaymentMethodState with PaymentTerminal', () => {
    //         const actual = iterator.next();
    //         const expected = [{ name: PaymentMethodNameState.PaymentTerminal }];
    //         expect(actual.value).toEqual(expected);
    //         expect(actual.done).toBeTruthy();
    //     });
    // });

    describe('config with truthy terminals and truthy paymentFlowHold', () => {
        const config = {
            initConfig: {
                terminals: true,
                paymentFlowHold: true
            }
        } as any;
        const iterator = toAvailablePaymentMethods(paymentMethods, config, amountInfo);

        it('should return PaymentMethodState without PaymentTerminal', () => {
            const actual = iterator.next();
            const expected = [{ name: PaymentMethodNameState.BankCard }];
            expect(actual.value).toEqual(expected);
            expect(actual.done).toBeTruthy();
        });
    });

    describe('config with falsy terminals', () => {
        const config = {
            initConfig: {
                terminals: false
            }
        } as any;
        const iterator = toAvailablePaymentMethods(paymentMethods, config, amountInfo);

        it('should return PaymentMethodState without PaymentTerminal', () => {
            const actual = iterator.next();
            expect(actual.value).toEqual([{ name: PaymentMethodNameState.BankCard }]);
            expect(actual.done).toBeTruthy();
        });
    });
});
