import cardFromType from '../common/cardFromType';
import indexOf from '../common/indexOf';

export default function (cvc, type) {
    let _ref;
    cvc = cvc.trim();
    if (!/^\d+$/.test(cvc)) {
        return false;
    }
    const card = cardFromType(type);
    if (card != null) {
        return _ref = cvc.length, indexOf.call(card.cvcLength, _ref) >= 0;
    } else {
        return cvc.length >= 3 && cvc.length <= 4;
    }
}
