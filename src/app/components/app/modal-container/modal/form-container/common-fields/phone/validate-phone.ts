import { validatePhone as _validatePhone } from 'checkout/utils';

export function validatePhone(value: string): boolean {
    return _validatePhone(value);
}
