export function validateEmail(email: string): boolean {
    if (!email) {
        return true;
    }
    const regExp = new RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i);
    return !regExp.test(email.trim().toLowerCase());
}
