import { cardExpiryVal } from './card-expiry-val';
import { validateCardExpiry } from './validate-card-expiry';

export function validateExpireDate(value: any): boolean {
    if (!value) {
        return true;
    }
    const formatVal = cardExpiryVal(value);
    return !validateCardExpiry(formatVal);
}
