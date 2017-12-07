export function validateCardHolder(cardHolder: string): boolean {
    if (!cardHolder) {
        return true;
    }
    const reg = /^[a-zA-Z 0-9 .,'/-]+$/;
    return !reg.test(cardHolder.trim());
}
