export default function (value) {
    let month, prefix, year, _ref;
    _ref = value.split(/[\s\/]+/, 2), month = _ref[0], year = _ref[1];
    if ((year != null ? year.length : void 0) === 2 && /^\d+$/.test(year)) {
        prefix = (new Date).getFullYear();
        prefix = prefix.toString().slice(0, 2);
        year = prefix + year;
    }
    month = parseInt(month, 10);
    year = parseInt(year, 10);
    return {
        month: month,
        year: year
    };
}
