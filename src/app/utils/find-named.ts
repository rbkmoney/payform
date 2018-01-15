import { Named } from 'checkout/state';

export const findNamed = (items: Named[], name: string): Named =>
    items && name ? items.find((item) => item.name === name) : null;
