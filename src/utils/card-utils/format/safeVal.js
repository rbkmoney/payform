export default function(value, $target) {
    var currPair, cursor, digit, error, last, prevPair;
    try {
        cursor = $target.prop('selectionStart');
    } catch (_error) {
        error = _error;
        cursor = null;
    }
    last = $target.val();
    $target.val(value);
    if (cursor !== null && $target.is(":focus")) {
        if (cursor === last.length) {
            cursor = value.length;
        }
        if (last !== value) {
            prevPair = last.slice(cursor - 1, +cursor + 1 || 9e9);
            currPair = value.slice(cursor - 1, +cursor + 1 || 9e9);
            digit = value[cursor];
            if (/\d/.test(digit) && prevPair === ("" + digit + " ") && currPair === (" " + digit)) {
                cursor = cursor + 1;
            }
        }
        $target.prop('selectionStart', cursor);
        return $target.prop('selectionEnd', cursor);
    }
}
