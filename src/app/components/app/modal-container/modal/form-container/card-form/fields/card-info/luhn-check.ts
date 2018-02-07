export function luhnCheck(num: string): boolean {
    let odd = true;
    let sum = 0;
    const digits = (num + '').split('').reverse();
    for (let i = 0, len = digits.length; i < len; i++) {
        let digit: any = digits[i];
        digit = parseInt(digit, 10);
        const isOdd = odd = !odd;
        if (isOdd) {
            digit *= 2;
        }
        if (digit > 9) {
            digit -= 9;
        }
        sum += digit;
    }
    return sum % 10 === 0;
}
