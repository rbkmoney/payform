import hasTextSelected from './hasTextSelected';

export default function(e) {
    let digit, val;
    const target = e.currentTarget;
    digit = String.fromCharCode(e.which);
    if (!/^\d+$/.test(digit)) {
        return;
    }
    if (hasTextSelected(target)) {
        return;
    }
    val = target.value + digit;
    return val.length <= 4;
}
