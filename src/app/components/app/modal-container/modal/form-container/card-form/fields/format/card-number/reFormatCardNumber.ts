import replaceFullWidthChars from '../common/replaceFullWidthChars';
import safeVal from '../common/safeVal';
import cardFromNumber from './cardFromNumber';

function format(num: string) {
    num = num.replace(/\D/g, '');
    const card = cardFromNumber(num);
    if (!card) {
        return num;
    }
    const upperLength = card.length[card.length.length - 1];
    num = num.slice(0, upperLength);
    if (card.format.global) {
        let ref;
        return (ref = num.match(card.format)) != null ? ref.join(' ') : void 0;
    } else {
        let groups: any = card.format.exec(num);
        if (groups == null) {
            return;
        }
        groups.shift();
        groups = groups.filter((n: any) => n);
        return groups.join(' ');
    }
}

export function reFormatCardNumber(e: KeyboardEvent) {
    const target = e.currentTarget as HTMLInputElement;
    let value = target.value;
    value = replaceFullWidthChars(value);
    value = format(value);
    return safeVal(value, target);
}
