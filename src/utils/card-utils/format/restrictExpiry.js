import hasTextSelected from './hasTextSelected';

export default function(e) {
    let digit, value;
    const target = e.currentTarget;
    digit = String.fromCharCode(e.which);
    if (!/^\d+$/.test(digit)) {
        return;
    }
    if (hasTextSelected(target)) {
        return;
    }
    value = target.value + digit;
    value = value.replace(/\D/g, '');
    if (value.length > 6) {
        return false;
    }
}
