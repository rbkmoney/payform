import { call, CallEffect, put, PutEffect, select, SelectEffect } from 'redux-saga/effects';
import { PaymentMethod } from 'checkout/backend';
import { Config, IntegrationType } from 'checkout/config';
import { InitializeAvailablePaymentMethodsCompleted, TypeKeys } from 'checkout/actions';
import {
    PaymentMethod as PaymentMethodState,
    ConfigState,
    State,
    AmountInfoState
} from 'checkout/state';
import { setPriority } from './set-priority';
import { toAvailablePaymentMethods } from './to-available-payment-methods';

export type InitializeEffect =
    CallEffect
    | PutEffect<InitializeAvailablePaymentMethodsCompleted>
    | SelectEffect
    | PaymentMethodState;

export function* init(config: Config, paymentMethods: PaymentMethod[], amountInfo: AmountInfoState): Iterator<InitializeEffect> {
    // const mock = [
    //     {
    //         method: 'PaymentTerminal',
    //         providers: ['euroset']
    //     },
    //     {
    //         method: 'DigitalWallet',
    //         providers: ['qiwi']
    //     },
    //     {
    //         method: 'BankCard',
    //         paymentSystems: ['mastercard', 'nspkmir', 'visa']
    //     },
    //     {
    //         method: 'BankCard',
    //         paymentSystems: ['mastercard', 'visa'],
    //         tokenProviders: ['googlepay', 'applepay']
    //     } as PaymentMethod,
    // ] as PaymentMethod[];
    // const methods = yield call(toAvailablePaymentMethods, mock, config, amountInfo);
    const methods = yield call(toAvailablePaymentMethods, paymentMethods, config, amountInfo);
    const prioritizedMethods = yield call(setPriority, methods);
    yield put({
        type: TypeKeys.INITIALIZE_AVAILABLE_PAYMENT_METHODS_COMPLETED,
        payload: prioritizedMethods
    } as InitializeAvailablePaymentMethodsCompleted);
    return yield select((state: State) => state.availablePaymentMethods);
}

type Effects = CallEffect | SelectEffect | PaymentMethod[];

export function* initializeAvailablePaymentMethods(config: ConfigState, paymentMethods: PaymentMethod[], amountInfo: AmountInfoState): Iterator<Effects> {
    switch (config.initConfig.integrationType) {
        case IntegrationType.customer:
            return null;
        default:
            return yield call(init, config, paymentMethods, amountInfo);
    }
}
