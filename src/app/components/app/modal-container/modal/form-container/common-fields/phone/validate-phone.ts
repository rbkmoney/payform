import * as libphonenumber from 'libphonenumber-js';

export function validatePhone(value: string): boolean {
    if (!value) {
        return true;
    }
    return !libphonenumber.isValidNumber(value, 'RU');
}
