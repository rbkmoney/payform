import replaceFullWidthChars from './replaceFullWidthChars';
import safeVal from './safeVal';

export default function(e) {
    var $target;
    $target = $(e.currentTarget);
    return setTimeout(function() {
        var value;
        value = $target.val();
        value = replaceFullWidthChars(value);
        value = value.replace(/\D/g, '').slice(0, 4);
        return safeVal(value, $target);
    });
}
