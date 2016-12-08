export default function(value, target) {
    let currPair, cursor, digit, prevPair;
    try {
        cursor = target.selectionStart;
    } catch (_error) {
        cursor = null;
    }
    const last = target.value;
    target.value = value;
    if (cursor !== null && target.matches(':focus')) {
        if (cursor === last.length) {
            cursor = value.length;
        }
        if (last !== value) {
            prevPair = last.slice(cursor - 1, +cursor + 1 || 9e9);
            currPair = value.slice(cursor - 1, +cursor + 1 || 9e9);
            digit = value[cursor];
            if (/\d/.test(digit) && prevPair === ('' + digit + ' ') && currPair === (' ' + digit)) {
                cursor = cursor + 1;
            }
        }
        target.selectionStart = cursor;
        return target.selectionEnd = cursor;
    }
}
