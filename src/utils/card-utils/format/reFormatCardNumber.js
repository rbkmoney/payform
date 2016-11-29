import replaceFullWidthChars from './replaceFullWidthChars';
import safeVal from './safeVal';
import cardFromNumber from '../common/cardFromNumber';

function format(num) {
    num = num.replace(/\D/g, '');
    const card = cardFromNumber(num);
    if (!card) {
        return num;
    }
    const upperLength = card.length[card.length.length - 1];
    num = num.slice(0, upperLength);
    if (card.format.global) {
        let _ref;
        return (_ref = num.match(card.format)) != null ? _ref.join(' ') : void 0;
    } else {
        let groups = card.format.exec(num);
        if (groups == null) {
            return;
        }
        groups.shift();
        groups = groups.filter(n => n);
        return groups.join(' ');
    }
}

export default function (e) {
    const target = e.currentTarget;
    return setTimeout(function () {
        let value;
        value = target.value;
        value = replaceFullWidthChars(value);
        value = format(value);
        return safeVal(value, target);
    });
}
