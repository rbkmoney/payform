import { AsYouType, getPhoneCode } from 'libphonenumber-js/custom';
import metadata from './metadata.json';

export function getPhoneCountryCode(value: string): string {
    const formatter = new AsYouType('RU', metadata);
    formatter.input(value);
    return getPhoneCode(formatter.country, metadata).toString();
}
