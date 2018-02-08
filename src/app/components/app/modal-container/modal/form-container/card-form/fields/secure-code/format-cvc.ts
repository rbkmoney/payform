import { FormEvent } from 'react';
import { safeVal, replaceFullWidthChars } from '../format-utils';

export function formatCVC(e: FormEvent<HTMLInputElement>): number {
    const target = e.currentTarget as HTMLInputElement;
    let value = target.value;
    value = replaceFullWidthChars(value);
    value = value.replace(/\D/g, '').slice(0, 4);
    return safeVal(value, target);
}
