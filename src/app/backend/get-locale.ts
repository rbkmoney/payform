import { Locale } from 'checkout/locale';
import { detectLocale } from '../../locale';

export const getLocale = (locale: string): Promise<Locale> => (
    fetch(`../v1/locale/${detectLocale(locale)}.json`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((response) => response.json())
);
