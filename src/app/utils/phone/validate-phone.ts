import parse from 'libphonenumber-js/min';

export function validatePhone(value: string): boolean {
    if (!value) {
        return true;
    }
    const parsed = parse(value);
    return !parsed || !parsed.isValid();
}
