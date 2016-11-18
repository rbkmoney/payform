export default function(e) {
    const target = e.currentTarget;
    let value = target.value;
    if (e.which !== 8) {
        return;
    }
    if ((target.selectionStart != null) && target.selectionStart !== value.length) {
        return;
    }
    if (/\d\s$/.test(value)) {
        e.preventDefault();
        return setTimeout(function() {
            return target.value = value.replace(/\d\s$/, '');
        });
    } else if (/\s\d?$/.test(value)) {
        e.preventDefault();
        return setTimeout(function() {
            return target.value = value.replace(/\d$/, '');
        });
    }
};
