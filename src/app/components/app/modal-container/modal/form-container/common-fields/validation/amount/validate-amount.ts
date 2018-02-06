import isNumber from 'lodash-es/isNumber';

export function validateAmount(amount: number, min?: number, max?: number): boolean {
    if (!amount || !isNumber(amount) || amount <= 0) {
        return true;
    }
    if (min && max) {
        return !(amount >= min && amount <= max);
    }
    return false;
}
