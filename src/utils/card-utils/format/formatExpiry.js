export default function(e) {
    var $target, digit, val;
    digit = String.fromCharCode(e.which);
    if (!/^\d+$/.test(digit)) {
        return;
    }
    $target = $(e.currentTarget);
    val = $target.val() + digit;
    if (/^\d$/.test(val) && (val !== '0' && val !== '1')) {
        e.preventDefault();
        return setTimeout(function() {
            return $target.val("0" + val + " / ");
        });
    } else if (/^\d\d$/.test(val)) {
        e.preventDefault();
        return setTimeout(function() {
            var m1, m2;
            m1 = parseInt(val[0], 10);
            m2 = parseInt(val[1], 10);
            if (m2 > 2 && m1 !== 0) {
                return $target.val("0" + m1 + " / " + m2);
            } else {
                return $target.val("" + val + " / ");
            }
        });
    }
}
