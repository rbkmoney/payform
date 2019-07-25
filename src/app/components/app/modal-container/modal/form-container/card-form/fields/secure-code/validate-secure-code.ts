import { cvv, number } from 'card-validator';

export function validateSecureCode(value: string, { cardNumber }: { cardNumber: string }): boolean {
    const { card } = number(cardNumber);
    return !(card ? cvv(value, card.code.size) : cvv(value)).isValid;
}
