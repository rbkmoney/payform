import { call, CallEffect } from 'redux-saga/effects';
import {
    AmountInfoState,
    PaymentMethod as PaymentMethodState,
    PaymentMethodName as PaymentMethodNameState
} from 'checkout/state';
import { PaymentMethod, PaymentMethodName, PaymentTerminal } from 'checkout/backend';
import { Config } from 'checkout/config';
import { bankCardToMethods } from './bank-card-to-methods';
import { getDigitalWalletPaymentMethods, getTerminalsPaymentMethods } from './get-payment-methods';

export function* toAvailablePaymentMethods(
    paymentMethods: PaymentMethod[],
    config: Config,
    amountInfo: AmountInfoState
): Iterator<CallEffect | PaymentMethodState[]> {
    let result: PaymentMethodState[] = [];
    const { wallets, euroset, qps, uzcard, paymentFlowHold, recurring } = config.initConfig;
    for (const method of paymentMethods) {
        switch (method.method) {
            case PaymentMethodName.BankCard:
                const bankCardMethods = yield call(bankCardToMethods, method, config, amountInfo);
                result = result.concat(bankCardMethods);
                break;
            case PaymentMethodName.DigitalWallet:
                result = result.concat(getDigitalWalletPaymentMethods(wallets, paymentFlowHold, recurring));
                break;
            case PaymentMethodName.PaymentTerminal:
                result = result.concat(
                    getTerminalsPaymentMethods(
                        { euroset, qps, uzcard },
                        (method as PaymentTerminal).providers,
                        paymentFlowHold,
                        recurring
                    )
                );
                break;
            case PaymentMethodName.MobileCommerce:
                if (config.initConfig.mobileCommerce) {
                    result = result.concat([{ name: PaymentMethodNameState.MobileCommerce }]);
                }
                break;
        }
    }
    if (result.length === 0) {
        result.push({ name: PaymentMethodNameState.BankCard });
        console.warn("Selected payment methods are currently unavailable. The parameter 'bankCard' has been enabled.");
    }
    return result;
}
