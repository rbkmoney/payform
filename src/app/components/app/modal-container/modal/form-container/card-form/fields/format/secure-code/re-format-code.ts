import replaceFullWidthChars from '../common/replace-full-width-chars';
import safeVal from '../common/safe-val';

export function reFormatCVC(e: KeyboardEvent): number {
    const target = e.currentTarget as HTMLInputElement;
    let value = target.value;
    value = replaceFullWidthChars(value);
    value = value.replace(/\D/g, '').slice(0, 4);
    return safeVal(value, target);
}
