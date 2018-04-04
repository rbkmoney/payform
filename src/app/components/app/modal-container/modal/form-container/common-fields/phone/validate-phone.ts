import { isValidNumber } from 'libphonenumber-js/custom';
import * as metadata from './metadata.json';

export function validatePhone(value: string): boolean {
    if (!value) {
        return true;
    }
    return !isValidNumber(value, metadata);
}
