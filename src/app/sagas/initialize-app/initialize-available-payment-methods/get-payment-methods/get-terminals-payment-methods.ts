import { PaymentMethod as PaymentMethodState, PaymentMethodName as PaymentMethodNameState } from 'checkout/state';
import { logUnavailableWithConfig } from './log-unavailable-with-config';

export const getTerminalsPaymentMethods = (
    isMethod: boolean,
    paymentFlowHold: boolean,
    recurring: boolean
): PaymentMethodState[] => {
    if (isMethod) {
        if (paymentFlowHold) {
            logUnavailableWithConfig('terminals', 'paymentFlowHold');
        } else if (recurring) {
            logUnavailableWithConfig('terminals', 'recurring');
        } else {
            return [{ name: PaymentMethodNameState.Euroset }];
        }
    }
    return [];
};
