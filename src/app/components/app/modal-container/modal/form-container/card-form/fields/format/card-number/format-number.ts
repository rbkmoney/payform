import cardFromNumber from './card-from-number';

export const formatNumber = (e: KeyboardEvent): Object => {
    const digit = String.fromCharCode(e.which);
    if (!/^\d+$/.test(digit)) {
        return;
    }
    const target = e.currentTarget as HTMLInputElement;
    const value = target.value;
    const card = cardFromNumber(value + digit);
    const length = (value.replace(/\D/g, '') + digit).length;
    let upperLength = 16;
    if (card) {
        upperLength = card.length[card.length.length - 1];
    }
    if (length >= upperLength) {
        return;
    }
    if ((target.selectionStart != null) && target.selectionStart !== value.length) {
        return;
    }
    let re;
    if (card && card.type === 'amex') {
        re = /^(\d{4}|\d{4}\s\d{6})$/;
    } else {
        re = /(?:^|\s)(\d{4})$/;
    }
    if (re.test(value)) {
        e.preventDefault();
        return setTimeout(() => {
            return target.value = value + ' ' + digit;
        });
    } else if (re.test(value + digit)) {
        e.preventDefault();
        return setTimeout(() => {
            return target.value = value + digit + ' ';
        });
    }
};
