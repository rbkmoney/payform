import { safeVal, replaceFullWidthChars } from '../format-utils';

export function formatCVC(e: KeyboardEvent): number {
    const target = e.currentTarget as HTMLInputElement;
    let value = target.value;
    value = replaceFullWidthChars(value);
    value = value.replace(/\D/g, '').slice(0, 4);
    return safeVal(value, target);
}
