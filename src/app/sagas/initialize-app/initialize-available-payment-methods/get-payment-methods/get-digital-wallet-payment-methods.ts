import { PaymentMethod as PaymentMethodState, PaymentMethodName as PaymentMethodNameState } from 'checkout/state';
import { logUnavailableWithConfig } from './log-unavailable-with-config';

export const getDigitalWalletPaymentMethods = (
    isMethod: boolean,
    paymentFlowHold: boolean,
    recurring: boolean
): PaymentMethodState[] => {
    if (isMethod) {
        if (paymentFlowHold) {
            logUnavailableWithConfig('wallets', 'paymentFlowHold');
        } else if (recurring) {
            logUnavailableWithConfig('wallets', 'recurring');
        } else {
            return [{ name: PaymentMethodNameState.DigitalWallet }];
        }
    }
    return [];
};
