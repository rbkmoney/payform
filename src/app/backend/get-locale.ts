import { Locale } from 'checkout/locale';
import { detectLocale } from 'checkout/utils';

export const getLocale = (locale: string): Promise<Locale> => (
    fetch(`../locale/${detectLocale(locale)}.json`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((response) => response.json())
);
