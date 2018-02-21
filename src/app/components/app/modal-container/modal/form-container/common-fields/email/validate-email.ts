export function validateEmail(value: any): boolean {
    if (!value) {
        return true;
    }
    const regExp = new RegExp(/^[A-z0-9._%+-]+@[A-z0-9.-]+\.[A-z]{2,63}$/i); // 2 to 63 because domain name can be from 2 characters to 63 characters only by RFC 1035
    return !regExp.test(value.trim().toLowerCase());
}
