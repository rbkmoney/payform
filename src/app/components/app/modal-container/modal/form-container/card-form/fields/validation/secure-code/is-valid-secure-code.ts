import { cardFromType } from '../common/card-from-type';
import { indexOf } from '../common/indexOf';

export function isValidSecureCode(cvc: string, type: string) {
    let ref;
    cvc = cvc.trim();
    if (!/^\d+$/.test(cvc)) {
        return false;
    }
    const card = cardFromType(type);
    if (card != null) {
        return (ref = cvc.length, indexOf.call(card.cvcLength, ref) >= 0);
    } else {
        return (cvc.length >= 3 && cvc.length <= 4);
    }
}
