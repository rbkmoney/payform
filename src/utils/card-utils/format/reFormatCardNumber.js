import replaceFullWidthChars from './replaceFullWidthChars';
import safeVal from './safeVal';
import cardFromNumber from '../common/cardFromNumber';

function format(num) {
    let card, groups, upperLength, _ref;
    num = num.replace(/\D/g, '');
    card = cardFromNumber(num);
    if (!card) {
        return num;
    }
    upperLength = card.length[card.length.length - 1];
    num = num.slice(0, upperLength);
    if (card.format.global) {
        return (_ref = num.match(card.format)) != null ? _ref.join(' ') : void 0;
    } else {
        groups = card.format.exec(num);
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
