export function formatExpiry(e: KeyboardEvent) {
    const digit = String.fromCharCode(e.which);
    if (!/^\d+$/.test(digit)) {
        return;
    }
    const target = e.currentTarget as HTMLInputElement;
    const val = target.value + digit;
    if (/^\d$/.test(val) && (val !== '0' && val !== '1')) {
        e.preventDefault();
        return setTimeout(() => {
            return target.value = '0' + val + ' / ';
        });
    } else if (/^\d\d$/.test(val)) {
        e.preventDefault();
        return setTimeout(() => {
            const m1 = parseInt(val[0], 10);
            const m2 = parseInt(val[1], 10);
            if (m2 > 2 && m1 !== 0) {
                return target.value = '0' + m1 + ' / ' + m2;
            } else {
                return target.value = '' + val + ' / ';
            }
        });
    }
}
