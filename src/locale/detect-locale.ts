import { isIE } from './is-ie';

const locales = ['ru', 'en'];

export const detectLocale = (locale: string = 'auto'): string => {
    let result;
    if (locale === 'auto') {
        const language = isIE ? (navigator as any).userLanguage : navigator.language;
        result = detectLocale(language.split('-')[0]);
    } else {
        result = locales.find((item) => item === locale);
    }
    return result || 'en';
};
