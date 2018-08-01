import { logPrefix, sadnessMessage } from 'checkout/log-messages';
import { CheckResult, UnavailableReason } from './check-result';

export const logUnavailableResult = (param: string, result: CheckResult) => {
    if (result.available) {
        return;
    }
    const prepareMessage = (availability: string) =>
        `${logPrefix} Param '${param}' is ${availability}. ${result.message} ${sadnessMessage}`;
    let message;
    switch (result.reason) {
        case UnavailableReason.capability:
            message = prepareMessage('unavailable');
            break;
        case UnavailableReason.validation:
            message = prepareMessage('invalid');
            break;
    }
    console.warn(message);
};
