import hasTextSelected from './hasTextSelected';

export default function(e) {
    var $target, digit, val;
    $target = $(e.currentTarget);
    digit = String.fromCharCode(e.which);
    if (!/^\d+$/.test(digit)) {
        return;
    }
    if (hasTextSelected($target)) {
        return;
    }
    val = $target.val() + digit;
    return val.length <= 4;
}
