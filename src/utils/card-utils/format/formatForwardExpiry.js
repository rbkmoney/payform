export default function (e) {
    const digit = String.fromCharCode(e.which);
    if (!/^\d+$/.test(digit)) {
        return;
    }
    const target = e.currentTarget;
    const val = target.value;
    if (/^\d\d$/.test(val)) {
        return target.value = '' + val + ' / ';
    }
}
