import { isContainCardNumber } from 'checkout/utils';

const CARD_HOLDER_REGEXP = /^[a-zA-Z0-9 .,'/-]+$/;

export function validateCardHolder(value: string): boolean {
    return !value || !value.trim() || !CARD_HOLDER_REGEXP.test(value) || isContainCardNumber(value);
}
