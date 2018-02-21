export interface ExpiryDate {
    month: number;
    year: number;
}

export function cardExpiryVal(value: string): ExpiryDate {
    let month;
    let prefix;
    let year;
    let ref;
    ref = value.split(/[\s\/]+/, 2), month = ref[0], year = ref[1];
    if ((year != null ? year.length : void 0) === 2 && /^\d+$/.test(year)) {
        prefix = (new Date()).getFullYear();
        prefix = prefix.toString().slice(0, 2);
        year = prefix + year;
    }
    month = parseInt(month, 10);
    year = parseInt(year, 10);
    return {
        month,
        year
    };
}
