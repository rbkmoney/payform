import { AsYouType } from 'libphonenumber-js/min';

export const formatPhoneNumber = (value: string): string => {
    return value.slice(0, 1) === '+' ? new AsYouType('RU').input(value) : '+';
};
