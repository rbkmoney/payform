import { Locale } from 'checkout/locale';
import { detectLocale } from '../../locale';
import { getNocacheValue } from 'checkout/utils';

export const getLocale = (locale: string): Promise<Locale> => (
    fetch(`../v1/locale/${detectLocale(locale)}.json?nocache=${getNocacheValue()}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((response) => response.json())
);
