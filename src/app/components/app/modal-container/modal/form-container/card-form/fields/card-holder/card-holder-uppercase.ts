import { FormEvent } from 'react';

export const cardHolderUppercase = (e: FormEvent<HTMLInputElement>) => {
    const target = e.currentTarget;
    const value = target.value;
    target.value = value.toUpperCase();
};
