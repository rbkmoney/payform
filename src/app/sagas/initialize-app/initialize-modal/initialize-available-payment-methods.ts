import { call, CallEffect, put, PutEffect } from 'redux-saga/effects';
import { AppConfig, BankCard, PaymentMethod, PaymentMethodName } from 'checkout/backend';
import { Config } from 'checkout/config';
import { InitializeAvailablePaymentMethodsCompleted, TypeKeys } from 'checkout/actions';
import {
    PaymentMethodName as PaymentMethodNameState,
    PaymentMethod as PaymentMethodState
} from 'checkout/state';
import { BankCardTokenProvider } from 'checkout/backend/model';
import { isApplePayAvailable, isGooglePayAvailable } from '../../../../environment';
import { logPrefix } from 'checkout/log-messages';

export function* applePayAvailable(applePayMerchantID: string, inFrame: boolean): Iterator<CallEffect | boolean> {
    const available = isApplePayAvailable();
    if (!available) {
        return false;
    }
    try {
        const canMakePayments = yield call(ApplePaySession.canMakePaymentsWithActiveCard, applePayMerchantID);
        if (!inFrame) {
            console.error(`${logPrefix} Apple Pay is not available in frame`);
        }
        return canMakePayments;
    } catch (error) {
        console.error(`${logPrefix} ApplePaySession.canMakePaymentsWithActiveCard`, error);
        return false;
    }
}

export function* bankCardToMethods(bankCard: BankCard, appConfig: AppConfig, inFrame: boolean): Iterator<CallEffect | PaymentMethodState> {
    const {tokenProviders} = bankCard;
    if (tokenProviders && tokenProviders.length > 0) {
        for (const provider of tokenProviders) {
            switch (provider) {
                case BankCardTokenProvider.applepay:
                    const isAvailable = yield call(applePayAvailable, appConfig.applePayMerchantID, inFrame);
                    if (isAvailable) {
                        return {name: PaymentMethodNameState.ApplePay};
                    }
                    break;
                case BankCardTokenProvider.googlepay:
                    if (isGooglePayAvailable()) {
                        return {name: PaymentMethodNameState.GooglePay};
                    }
            }
        }
    } else {
        return {name: PaymentMethodNameState.BankCard};
    }
}

export function* toAvailablePaymentMethods(paymentMethods: PaymentMethod[], config: Config): Iterator<CallEffect | PaymentMethodState[]> {
    const result: PaymentMethodState[] = [];
    const {wallets, terminals} = config.initConfig;
    for (const method of paymentMethods) {
        switch (method.method) {
            case PaymentMethodName.BankCard:
                const bankCardMethod = yield call(bankCardToMethods, method, config.appConfig, config.inFrame);
                if (bankCardMethod) {
                    result.push(bankCardMethod);
                }
                break;
            case PaymentMethodName.DigitalWallet:
                if (wallets) {
                    result.push({name: PaymentMethodNameState.DigitalWallet});
                }
                break;
            case PaymentMethodName.PaymentTerminal:
                if (terminals) {
                    result.push({name: PaymentMethodNameState.PaymentTerminal});
                }
                break;
        }
    }
    return result;
}

export const setPriority = (methods: PaymentMethodState[]): PaymentMethodState[] =>
    methods.map((method) => {
        switch (method.name) {
            case PaymentMethodNameState.ApplePay:
                return {
                    ...method,
                    priority: 1
                };
            case PaymentMethodNameState.GooglePay:
                return {
                    ...method,
                    priority: 1
                };
            case PaymentMethodNameState.BankCard:
                return {
                    ...method,
                    priority: 2
                };
            case PaymentMethodNameState.DigitalWallet:
                return {
                    ...method,
                    priority: 3
                };
            case PaymentMethodNameState.PaymentTerminal:
                return {
                    ...method,
                    priority: 4
                };
        }
    });

export type InitializeEffect = CallEffect | PutEffect<InitializeAvailablePaymentMethodsCompleted>;

export function* initializeAvailablePaymentMethods(paymentMethods: PaymentMethod[], config: Config): Iterator<InitializeEffect> {
    const mock = [
        {'method': 'PaymentTerminal', 'providers': ['euroset']},
        {'method': 'DigitalWallet', 'providers': ['qiwi']},
        {'method': 'BankCard', 'paymentSystems': ['mastercard', 'nspkmir', 'visa']},
        {'method': 'BankCard', 'paymentSystems': ['mastercard', 'visa'], tokenProviders: ['googlepay']}
    ] as PaymentMethod[];

    const methods = yield call(toAvailablePaymentMethods, mock, config);
    const prioritizedMethods = yield call(setPriority, methods);
    yield put({
        type: TypeKeys.INITIALIZE_AVAILABLE_PAYMENT_METHODS_COMPLETED,
        payload: prioritizedMethods
    } as InitializeAvailablePaymentMethodsCompleted);
}
