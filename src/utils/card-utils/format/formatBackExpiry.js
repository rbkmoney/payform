export default function(e) {
    var $target, value;
    $target = $(e.currentTarget);
    value = $target.val();
    if (e.which !== 8) {
        return;
    }
    if (($target.prop('selectionStart') != null) && $target.prop('selectionStart') !== value.length) {
        return;
    }
    if (/\d\s\/\s$/.test(value)) {
        e.preventDefault();
        return setTimeout(function() {
            return $target.val(value.replace(/\d\s\/\s$/, ''));
        });
    }
}
