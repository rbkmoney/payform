import * as libphonenumber from 'libphonenumber-js';

const format = (e: KeyboardEvent) => {
    const target = e.currentTarget as HTMLInputElement;
    const value = target.value;
    if (value.slice(0, 2) === '+7') {
        target.value = new libphonenumber.AsYouType('RU').input(value);
    } else {
        target.value = `+${libphonenumber.getPhoneCode('RU') as string} `;
    }
};

export function phoneNumberFormatter(element: Element) {
    element.addEventListener('focus', format);
    element.addEventListener('keypress', format);
    element.addEventListener('keydown', format);
    element.addEventListener('change', format);
    element.addEventListener('input', format);
}
