import { isContainCardNumber } from 'checkout/utils';

/**
 * 2 to 63 because domain name can be from 2 characters to 63 characters only by RFC 1035
 */
const EMAIL_REGEXP = /^[A-z0-9._%+-]+@[A-z0-9.-]+\.[A-z]{2,63}$/i;

export function validateEmail(value: string): boolean {
    return !value || !value.trim() || !EMAIL_REGEXP.test(value.trim()) || isContainCardNumber(value);
}
