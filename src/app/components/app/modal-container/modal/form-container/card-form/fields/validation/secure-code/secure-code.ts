import { isValidSecureCode } from './is-valid-secure-code';

export function validateSecureCode(value: any, allValues: any): boolean {
    if (!allValues.cardNumber) {
        return null;
    }
    if (!value) {
        return true;
    }
    return !isValidSecureCode(value, allValues.cardNumber);
}
