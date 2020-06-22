import { AsYouType } from 'libphonenumber-js/custom';
import metadata from './metadata.json';

export const formatPhoneNumber = (value: string): string => {
    return value.slice(0, 1) === '+' ? new AsYouType('RU', metadata).input(value) : '+';
};
