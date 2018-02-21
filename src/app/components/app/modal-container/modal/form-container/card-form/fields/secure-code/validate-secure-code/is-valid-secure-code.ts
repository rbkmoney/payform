import { cardFromNumber } from '../../card-info';

export function isValidSecureCode(value: string, cardNumber: string): boolean {
    if (!value) {
        return true;
    }
    let ref;
    value = value.trim();
    if (!/^\d+$/.test(value)) {
        return false;
    }
    const card = cardFromNumber(cardNumber);
    if (card != null) {
        return (ref = value.length, [].indexOf.call(card.cvcLength, ref) >= 0);
    } else {
        return (value.length >= 3 && value.length <= 4);
    }
}
