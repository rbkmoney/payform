import { number } from 'card-validator';
import { get } from 'lodash-es';

import { replaceFullWidthChars } from '../../../common-fields/format-utils';

export function formatCVC(value: string, cardNumber: string): string {
    value = replaceFullWidthChars(value);
    const { card } = number(cardNumber);
    value = value.replace(/\D/g, '').slice(0, get(card, 'code.size', 4));
    return value;
}
