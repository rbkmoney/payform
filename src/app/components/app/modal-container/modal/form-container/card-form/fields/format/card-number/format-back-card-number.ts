export const formatBackCardNumber = (e: KeyboardEvent): number => {
    const target = e.currentTarget as HTMLInputElement;
    const value = target.value;
    if (e.which !== 8) {
        return;
    }
    if ((target.selectionStart != null) && target.selectionStart !== value.length) {
        return;
    }
    if (/\d\s$/.test(value)) {
        e.preventDefault();
        return setTimeout(() => {
            return target.value = value.replace(/\d\s$/, '');
        });
    } else if (/\s\d?$/.test(value)) {
        e.preventDefault();
        return setTimeout(() => {
            return target.value = value.replace(/\d$/, '');
        });
    }
};
