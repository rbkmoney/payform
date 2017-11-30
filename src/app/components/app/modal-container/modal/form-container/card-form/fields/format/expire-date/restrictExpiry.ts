import hasTextSelected from '../common/hasTextSelected';

export function restrictExpiry(e: KeyboardEvent) {
    const target = e.currentTarget as HTMLInputElement;
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
