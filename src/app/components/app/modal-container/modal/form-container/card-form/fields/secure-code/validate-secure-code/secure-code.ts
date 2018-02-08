import { isValidSecureCode } from './is-valid-secure-code';

export function validateSecureCode(value: any, allValues: any): boolean {
    if (!allValues.cardNumber) {
        return true;
    }
    if (!value) {
        return true;
    }
    return !isValidSecureCode(value, allValues.cardNumber);
}
