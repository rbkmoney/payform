import { AsYouType, getCountryCallingCode, CountryCode } from 'libphonenumber-js/min';

export function getPhoneCountryCode(value: string): string {
    const formatter = (new AsYouType('RU') as any) as AsYouType & { country: CountryCode };
    formatter.input(value);
    return getCountryCallingCode(formatter.country).toString();
}
