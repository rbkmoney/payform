import { ExpiryDate } from './card-expiry-val';

export function validateCardExpiry({month, year}: ExpiryDate): boolean {
    if (!(month && year)) {
        return false;
    }
    const newMonth = month + '';
    let newYear = year + '';
    if (!/^\d+$/.test(newMonth)) {
        return false;
    }
    if (!/^\d+$/.test(newYear)) {
        return false;
    }
    if (!((1 <= month && month <= 12))) {
        return false;
    }
    if (newYear.length === 2) {
        if (year < 70) {
            newYear = '20' + year;
        } else {
            newYear = '19' + year;
        }
    }
    if (newYear.length !== 4) {
        return false;
    }
    const expiry = new Date(year, month);
    const currentTime = new Date();
    expiry.setMonth(expiry.getMonth() - 1);
    expiry.setMonth(expiry.getMonth() + 1, 1);
    return expiry > currentTime;
}
