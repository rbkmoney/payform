import { Named } from 'checkout/state';

export const findNamed = <I extends Named = Named>(items: Named[], name: string): I =>
    items && name ? (items.find((item) => item.name === name) as I) : null;
