import { FormEvent } from 'react';
import { replaceFullWidthChars, safeVal } from '../format-utils';

const format = (num: string): string => {
    let result = num.replace(/\s/g, '');
    const formatReg = /\B(?=(\d{3})+(?!\d))/g;
    if (/^\d+([.,])?$/.test(result)) {
        result = result.replace(formatReg, ' ');
        const lastChar = result.charAt(result.length - 1);
        const isLastCharDot = lastChar === '.';
        const isLastCharComma = lastChar === ',';
        const isLastCharSpace = lastChar === ' ';
        result = isLastCharDot || isLastCharComma || isLastCharSpace ? result + ' ' : result;
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
        result = numTempArr.join(type + ' ').replace(formatReg, ' ');
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
    const nativeEvent = e.nativeEvent as any;
    value = replaceFullWidthChars(value);
    if (nativeEvent.inputType === 'deleteContentBackward') {
        return safeVal(value, target);
    } else {
        return safeVal(format(value), target);
    }
}
