import { call } from 'redux-saga/effects';
import { bankCardToMethods } from './bank-card-to-methods';
import { BankCard } from 'checkout/backend';
import { tokenProvidersToMethods } from './token-providers-to-methods';
import { PaymentMethodName as PaymentMethodNameState } from 'checkout/state';

const config = { initConfig: { bankCard: true } } as any;
const amountInfo = 'amountInfoMock' as any;

describe('bankCard with tokenProviders', () => {
    const bankCard = {
        method: 'BankCard',
        paymentSystems: ['mastercard', 'visa'],
        tokenProviders: ['applepay', 'googlepay']
    } as BankCard;

    const iterator = bankCardToMethods(bankCard, config, amountInfo);

    it('should call tokenProvidersToMethods', () => {
        const actual = iterator.next().value;
        const expected = call(tokenProvidersToMethods, bankCard.tokenProviders, config, amountInfo);
        expect(actual).toEqual(expected);
    });

    it('should iterator done', () => {
        const actual = iterator.next().done;
        expect(actual).toBeTruthy();
    });
});

describe('bankCard without tokenProviders', () => {
    const bankCard = {
        method: 'BankCard',
        paymentSystems: ['mastercard', 'nspkmir', 'visa', 'visaelectron']
    } as BankCard;

    const iterator = bankCardToMethods(bankCard, config, amountInfo);

    it('should return PaymentMethodNameState BankCard', () => {
        const actual = iterator.next().value;
        const expected = [{ name: PaymentMethodNameState.BankCard }];
        expect(actual).toEqual(expected);
    });

    it('should iterator done', () => {
        const actual = iterator.next().done;
        expect(actual).toBeTruthy();
    });
});
