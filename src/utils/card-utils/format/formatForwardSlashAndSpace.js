export default function(e) {
    const which = String.fromCharCode(e.which);
    if (!(which === '/' || which === ' ')) {
        return;
    }
    const target = e.currentTarget;
    const val = target.value;
    if (/^\d$/.test(val) && val !== '0') {
        return target.value = '0' + val + ' / ';
    }
}
