import { isIE } from 'checkout/utils/is-ie';
import { Locale } from 'checkout/locale';

const locales = ['ru', 'en'];

function detectLocale(locale: string = 'auto'): string {
    let result;
    if (locale === 'auto') {
        const language = isIE ? (navigator as any).userLanguage : navigator.language;
        result = detectLocale(language.split('-')[0]);
    } else {
        result = locales.find((item) => item === locale);
    }
    return result || 'ru';
}

export const getLocale = (locale: string): Promise<Locale> => (
    fetch(`../locale/${detectLocale(locale)}.json`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((response) => response.json())
);
