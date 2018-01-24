import * as libphonenumber from 'libphonenumber-js';

const format = (e: KeyboardEvent) => {
    const target = e.currentTarget as HTMLInputElement;
    const value = target.value;
    const defaultCode = `+${libphonenumber.getPhoneCode('RU') as string} `;
    if (value.slice(0, 2) === defaultCode) {
        target.value = new libphonenumber.AsYouType('RU').input(value);
    } else {
        target.value = defaultCode;
    }
};

export function phoneNumberFormatter(element: Element) {
    element.addEventListener('focus', format);
    element.addEventListener('keypress', format);
    element.addEventListener('keydown', format);
    element.addEventListener('change', format);
    element.addEventListener('input', format);
}
