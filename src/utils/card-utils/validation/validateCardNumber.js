import luhnCheck from '../common/luhnCheck';
import indexOf from '../common/indexOf';
import cardFromNumber from '../common/cardFromNumber';

export default function (num) {
    let _ref;
    num = (num + '').replace(/\s+|-/g, '');
    if (!/^\d+$/.test(num)) {
        return false;
    }
    const card = cardFromNumber(num);
    if (!card) {
        return false;
    }
    return (_ref = num.length, indexOf.call(card.length, _ref) >= 0) && (card.luhn === false || luhnCheck(num));
}
