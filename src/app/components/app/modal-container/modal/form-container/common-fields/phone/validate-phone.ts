import { isValidNumber } from 'libphonenumber-js';

import * as metadata from './metadata.json';

export function validatePhone(value: string): boolean {
    if (!value) {
        return true;
    }
    return !isValidNumber(value, 'RU', metadata);
}
