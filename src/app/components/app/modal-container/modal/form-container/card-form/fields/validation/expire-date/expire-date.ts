import { cardExpiryVal } from './card-expiry-val';
import { validateCardExpiry } from './validate-card-expiry';

export function validateExpireDate(date: string): boolean {
    if (!date) {
        return true;
    }
    const formatVal = cardExpiryVal(date);
    return !validateCardExpiry(formatVal);
}
