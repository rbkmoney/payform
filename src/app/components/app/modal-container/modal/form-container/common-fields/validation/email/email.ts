export function validateEmail(value: any): boolean {
    if (!value) {
        return true;
    }
    const regExp = new RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i);
    return !regExp.test(value.trim().toLowerCase());
}
