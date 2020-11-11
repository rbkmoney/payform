import * as cardValidator from 'card-validator';

export function validateCardNumber(value: string): boolean {
    return !cardValidator.number(value).isValid;
}
