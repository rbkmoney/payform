import hasTextSelected from '../common/hasTextSelected';

export function restrictCVC(e: KeyboardEvent) {
    const target = e.currentTarget as HTMLInputElement;
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
