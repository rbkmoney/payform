import { FormEvent } from 'react';
import { replaceFullWidthChars, safeVal } from '../../../common-fields/format-utils';
import { cardFromNumber } from '../card-info';

function format(num: string): string {
    num = num.replace(/\D/g, '');
    const card = cardFromNumber(num);
    if (!card) {
        return num;
    }
    const upperLength = card.length[card.length.length - 1];
    num = num.slice(0, upperLength);
    if (card.format.global) {
        const ref = num.match(card.format);
        return ref != null ? ref.join(' ') : void 0;
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

export function formatCardNumber(e: FormEvent<HTMLInputElement>): number {
    const target = e.currentTarget;
    let value = target.value;
    value = replaceFullWidthChars(value);
    value = format(value);
    return safeVal(value, target);
}
