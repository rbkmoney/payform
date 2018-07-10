import { call, CallEffect } from 'redux-saga/effects';
import {
    AmountInfoState,
    PaymentMethod as PaymentMethodState,
    PaymentMethodName as PaymentMethodNameState
} from 'checkout/state';
import { PaymentMethod, PaymentMethodName } from 'checkout/backend';
import { Config } from 'checkout/config';
import { bankCardToMethods } from './bank-card-to-methods';
import { logUnavailableResult, UnavailableReason } from 'checkout/sagas/log-unavailable-result';

export function* toAvailablePaymentMethods(paymentMethods: PaymentMethod[], config: Config, amountInfo: AmountInfoState): Iterator<CallEffect | PaymentMethodState[]> {
    let result: PaymentMethodState[] = [];
    const {wallets, terminals, bankCard} = config.initConfig;
    for (const method of paymentMethods) {
        switch (method.method) {
            case PaymentMethodName.BankCard:
                if (bankCard) {
                    const bankCardMethods = yield call(bankCardToMethods, method, config, amountInfo);
                    if (bankCardMethods) {
                        result = result.concat(bankCardMethods);
                    }
                }
                break;
            case PaymentMethodName.DigitalWallet:
                if (wallets) {
                    result.push({name: PaymentMethodNameState.DigitalWallet});
                }
                break;
            case PaymentMethodName.PaymentTerminal:
                if (config.initConfig.paymentFlowHold) {
                    logUnavailableResult('terminals', {
                        available: false,
                        message: 'The terminals payment method do not work with enabled paymentFlowHold.',
                        reason: UnavailableReason.validation
                    });
                    break;
                }
                if (terminals) {
                    result.push({name: PaymentMethodNameState.PaymentTerminal});
                }
                break;
        }
    }
    return result;
}
