import { logUnavailableResult, UnavailableReason } from 'checkout/sagas/log-unavailable-result';

export const logUnavailableWithPaymentFlowHold = (methodName: string) => {
    return logUnavailableResult(methodName, {
        available: false,
        message: `The '${methodName}' payment method do not work with enabled 'paymentFlowHold'.`,
        reason: UnavailableReason.validation
    });
};
