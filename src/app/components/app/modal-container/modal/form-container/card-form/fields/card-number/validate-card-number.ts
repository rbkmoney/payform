import { cardFromNumber, luhnCheck } from '../card-info';

export function validateCardNumber(value: string): boolean {
    if (!value) {
        return true;
    }
    let ref;
    value = (value + '').replace(/\s+|-/g, '');
    if (!/^\d+$/.test(value)) {
        return true;
    }
    const card = cardFromNumber(value);
    if (!card) {
        return true;
    }
    return !((ref = value.length, [].indexOf.call(card.length, ref) >= 0) && (card.luhn === false || luhnCheck(value)));
}
