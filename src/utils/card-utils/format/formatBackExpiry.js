export default function (e) {
    const target = e.currentTarget;
    const value = target.value;
    if (e.which !== 8) {
        return;
    }
    if ((target.selectionStart != null) && target.selectionStart !== value.length) {
        return;
    }
    if (/\d\s\/\s$/.test(value)) {
        e.preventDefault();
        return setTimeout(function () {
            return target.value = value.replace(/\d\s\/\s$/, '');
        });
    }
}
