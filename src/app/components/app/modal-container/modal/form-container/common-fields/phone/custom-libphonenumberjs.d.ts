import {AsYouType, CountryCallingCode, CountryCode, TelephoneNumber} from 'libphonenumber-js';

declare module 'libphonenumber-js' {
    export class CustomAsYouType implements AsYouType{
        country: CountryCode;
        template: string;

        constructor(defaultCountryCode: CountryCode, metadata: object);

        getNationalNumber(): string;

        input(text: string): string;

        reset(): void;
    }

    export function getPhoneCode(countryCode: CountryCode, metadata: object): CountryCallingCode;

    export function isValidNumber(phone: TelephoneNumber, country: CountryCode, metadata: object): boolean;
}
