import cardFromNumber from './cardFromNumber';

export default function (e) {
    var card, digit, length, re, upperLength, value;
    digit = String.fromCharCode(e.which);
    if (!/^\d+$/.test(digit)) {
        return;
    }
    const target = e.currentTarget;
    value = target.value;
    card = cardFromNumber(value + digit);
    length = (value.replace(/\D/g, '') + digit).length;
    upperLength = 16;
    if (card) {
        upperLength = card.length[card.length.length - 1];
    }
    if (length >= upperLength) {
        return;
    }
    if ((target.selectionStart != null) && target.selectionStart !== value.length) {
        return;
    }
    if (card && card.type === 'amex') {
        re = /^(\d{4}|\d{4}\s\d{6})$/;
    } else {
        re = /(?:^|\s)(\d{4})$/;
    }
    if (re.test(value)) {
        e.preventDefault();
        return setTimeout(function () {
            return target.value = value + ' ' + digit;
        });
    } else if (re.test(value + digit)) {
        e.preventDefault();
        return setTimeout(function () {
            return target.value = value + digit + ' ';
        });
    }
}
