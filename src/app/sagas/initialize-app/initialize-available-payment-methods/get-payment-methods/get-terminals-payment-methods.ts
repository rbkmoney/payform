import { PaymentMethod as PaymentMethodState, PaymentMethodName as PaymentMethodNameState } from 'checkout/state';
import { logUnavailableWithPaymentFlowHold } from './log-unavailable-with-payment-flow-hold';

export const getTerminalsPaymentMethods = (isMethod: boolean, paymentFlowHold: boolean): PaymentMethodState[] => {
    if (isMethod) {
        if (paymentFlowHold) {
            logUnavailableWithPaymentFlowHold('wallets');
        } else {
            return [{ name: PaymentMethodNameState.PaymentTerminal }];
        }
    }
    return [];
};
