import { FormEvent } from 'react';
import { replaceFullWidthChars, safeVal } from '../format-utils';

const format = (num: string): string => {
    let result = num.replace(/\s/g, '');
    const formatReg = /\B(?=(\d{3})+(?!\d))/g;
    if (/^\d+([.,]\d?\d)?$/.test(result) || result.charAt(result.length - 1) === '.' || result.charAt(result.length - 1) === ',') {
        result = result.replace(formatReg, ' ');
    } else if (/^\d+([.,]\d+)?$/.test(result)) {
        let numTempArr;
        let type;
        if (/^\d+(\.\d+)?$/.test(result)) {
            type = '.';
            numTempArr = result.split('.');
        } else {
            type = ',';
            numTempArr = result.split(',');
        }
        numTempArr[1] = numTempArr[1].slice(0, 2);
        result = numTempArr.join(type).replace(formatReg, ' ');
    } else if (result.length > 1) {
        result = result.slice(0, -1).replace(formatReg, ' ');
    } else {
        result = '';
    }
    return result;
};

export function formatAmount(e: FormEvent<HTMLInputElement>): number {
    const target = e.currentTarget;
    let value = target.value;
    value = replaceFullWidthChars(value);
    value = format(value);
    return safeVal(value, target);
}
