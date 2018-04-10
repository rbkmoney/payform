import { FormEvent } from 'react';

export const formatEmail = (e: FormEvent<HTMLInputElement>) => {
    const target = e.currentTarget;
    const value = target.value;
    target.value = value.replace(/\s/g, '');
};
