import { logUnavailableResult, UnavailableReason } from 'checkout/sagas/log-unavailable-result';

export const logUnavailableWithConfig = (methodName: string, configName: string) => {
    return logUnavailableResult(methodName, {
        available: false,
        message: `The '${methodName}' payment method do not work with enabled '${configName}'.`,
        reason: UnavailableReason.validation
    });
};
