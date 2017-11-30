import replaceFullWidthChars from '../common/replaceFullWidthChars';
import safeVal from '../common/safeVal';

export function reFormatCVC(e: KeyboardEvent) {
    const target = e.currentTarget as HTMLInputElement;
    let value = target.value;
    value = replaceFullWidthChars(value);
    value = value.replace(/\D/g, '').slice(0, 4);
    return safeVal(value, target);
}
