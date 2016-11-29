import hasTextSelected from './hasTextSelected';

export default function(e) {
    const target = e.currentTarget;
    const digit = String.fromCharCode(e.which);
    if (!/^\d+$/.test(digit)) {
        return;
    }
    if (hasTextSelected(target)) {
        return;
    }
    const val = target.value + digit;
    return val.length <= 4;
}
