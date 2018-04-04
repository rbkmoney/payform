import { FormEvent } from 'react';
import { format } from 'libphonenumber-js/custom';

import * as metadata from './metadata.json';

export const formatPhoneNumber = (e: FormEvent<HTMLInputElement>) => {
    const target = e.currentTarget as HTMLInputElement;
    const value = target.value;
    if (value.slice(0, 1) === '+') {
        target.value = format(value, 'International', metadata);
    } else {
        target.value = `+`;
    }
};
