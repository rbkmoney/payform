import { luhnCheck } from '../common/luhnCheck';
import { indexOf } from '../common/indexOf';
import { cardFromNumber } from '../../common-card-tools/card-from-number';

export function validateCardNumber(num: string): boolean {
    if (!num) {
        return true;
    }
    let ref;
    num = (num + '').replace(/\s+|-/g, '');
    if (!/^\d+$/.test(num)) {
        return true;
    }
    const card = cardFromNumber(num);
    if (!card) {
        return true;
    }
    return !((ref = num.length, indexOf.call(card.length, ref) >= 0) && (card.luhn === false || luhnCheck(num)));
}
