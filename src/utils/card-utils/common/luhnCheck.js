export default function (num) {
    let odd = true;
    let sum = 0;
    const digits = (num + '').split('').reverse();
    for (let _i = 0, _len = digits.length; _i < _len; _i++) {
        let digit = digits[_i];
        digit = parseInt(digit, 10);
        if ((odd = !odd)) {
            digit *= 2;
        }
        if (digit > 9) {
            digit -= 9;
        }
        sum += digit;
    }
    return sum % 10 === 0;
}
