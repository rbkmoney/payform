import * as libphonenumber from 'libphonenumber-js';

const format = (e: KeyboardEvent) => {
    const target = e.currentTarget as HTMLInputElement;
    const value = target.value;
    if (value[0] === '+') {
        target.value = new libphonenumber.AsYouType('RU').input(value);
    } else {
        target.value = libphonenumber.format(value, 'RU', 'International');
    }
};

export function phoneNumberFormatter(element: Element) {
    element.addEventListener('focus', format);
    element.addEventListener('keypress', format);
    element.addEventListener('keydown', format);
    element.addEventListener('change', format);
    element.addEventListener('input', format);
}
