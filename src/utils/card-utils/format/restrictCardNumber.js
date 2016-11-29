import hasTextSelected from './hasTextSelected';
import cardFromNumber from '../common/cardFromNumber';

export default function (e) {
    const target = e.currentTarget;
    const digit = String.fromCharCode(e.which);
    if (!/^\d+$/.test(digit)) {
        return;
    }
    if (hasTextSelected(target)) {
        return;
    }
    const value = (target.value + digit).replace(/\D/g, '');
    const card = cardFromNumber(value);
    if (card) {
        return value.length <= card.length[card.length.length - 1];
    } else {
        return value.length <= 16;
    }
}
