export function formatForwardExpiry(e: KeyboardEvent) {
    const digit = String.fromCharCode(e.which);
    if (!/^\d+$/.test(digit)) {
        return;
    }
    const target = e.currentTarget as HTMLInputElement;
    const val = target.value;
    if (/^\d\d$/.test(val)) {
        return target.value = '' + val + ' / ';
    }
}
