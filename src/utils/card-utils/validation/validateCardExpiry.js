export default function (month, year) {
    let currentTime, expiry, _ref;
    if (typeof month === 'object' && 'month' in month) {
        _ref = month, month = _ref.month, year = _ref.year;
    }
    if (!(month && year)) {
        return false;
    }
    month = month + '';
    year = year + '';
    if (!/^\d+$/.test(month)) {
        return false;
    }
    if (!/^\d+$/.test(year)) {
        return false;
    }
    if (!((1 <= month && month <= 12))) {
        return false;
    }
    if (year.length === 2) {
        if (year < 70) {
            year = '20' + year;
        } else {
            year = '19' + year;
        }
    }
    if (year.length !== 4) {
        return false;
    }
    expiry = new Date(year, month);
    currentTime = new Date;
    expiry.setMonth(expiry.getMonth() - 1);
    expiry.setMonth(expiry.getMonth() + 1, 1);
    return expiry > currentTime;
}
