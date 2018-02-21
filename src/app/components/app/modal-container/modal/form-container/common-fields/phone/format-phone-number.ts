import { FormEvent } from 'react';
import * as libphonenumber from 'libphonenumber-js';

export const formatPhoneNumber = (e: FormEvent<HTMLInputElement>) => {
    const target = e.currentTarget as HTMLInputElement;
    const value = target.value;
    if (value.slice(0, 2) === '+7') {
        target.value = new libphonenumber.AsYouType('RU').input(value);
    } else {
        target.value = `+${libphonenumber.getPhoneCode('RU')} `;
    }
};
