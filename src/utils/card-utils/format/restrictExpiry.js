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
    let value = target.value + digit;
    value = value.replace(/\D/g, '');
    if (value.length > 6) {
        return false;
    }
}
