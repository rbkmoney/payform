import * as libphonenumber from 'libphonenumber-js';

export function validatePhone(value: any): boolean {
    if (!value) {
        return true;
    }

    return !libphonenumber.isValidNumber(value, 'RU');
}
