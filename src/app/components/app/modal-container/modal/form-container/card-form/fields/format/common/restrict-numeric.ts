export function restrictNumeric(e: KeyboardEvent): boolean {
    if (e.metaKey || e.ctrlKey) {
        return true;
    }
    if (e.which === 32) {
        return false;
    }
    if (e.which === 0) {
        return true;
    }
    if (e.which < 33) {
        return true;
    }
    const input = String.fromCharCode(e.which);
    return !!/[\d\s]/.test(input);
}
