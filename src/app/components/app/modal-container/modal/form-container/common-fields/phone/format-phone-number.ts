import { FormEvent } from 'react';
import { formatPhoneNumber as _formatPhoneNumber } from 'checkout/utils';

export const formatPhoneNumber = (e: FormEvent<HTMLInputElement>) => {
    const target = e.currentTarget as HTMLInputElement;
    target.value = _formatPhoneNumber(target.value);
};
