export function validateCardHolder(value: any): boolean {
    if (!value) {
        return true;
    }
    const reg = /^[a-zA-Z 0-9 .,'/-]+$/;
    return !reg.test(value.trim());
}
