import replaceFullWidthChars from './replaceFullWidthChars';
import safeVal from './safeVal';

export default function(e) {
    const target = e.currentTarget;
    let value = target.value;
    value = replaceFullWidthChars(value);
    value = value.replace(/\D/g, '').slice(0, 4);
    return safeVal(value, target);
}
