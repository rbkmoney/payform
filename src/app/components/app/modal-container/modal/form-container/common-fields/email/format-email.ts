import { FormEvent } from 'react';

import { safeVal } from '../format-utils';

export const formatEmail = (e: FormEvent<HTMLInputElement>) => {
    const target = e.currentTarget;
    let value = target.value;
    value = value.replace(/ +/, '');
    return safeVal(value, target);
};
