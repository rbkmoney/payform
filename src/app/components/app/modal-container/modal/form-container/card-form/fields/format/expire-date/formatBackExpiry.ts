export function formatBackExpiry(e: KeyboardEvent) {
    const target = e.currentTarget as HTMLInputElement;
    const value = target.value;
    if (e.which !== 8) {
        return;
    }
    if ((target.selectionStart != null) && target.selectionStart !== value.length) {
        return;
    }
    if (/\d\s\/\s$/.test(value)) {
        e.preventDefault();
        return setTimeout(() => {
            return target.value = value.replace(/\d\s\/\s$/, '');
        });
    }
}
