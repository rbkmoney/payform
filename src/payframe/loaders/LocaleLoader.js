import 'whatwg-fetch';
import isIE from '../../utils/isIE';
const locales = ['ru', 'en'];
const defaultLocale = 'en';

export default class LocaleLoader {
    static getAvailableLocale(locale) {
        let result;
        if (!locale || locale === 'auto') {
            const language = isIE ? navigator.userLanguage : navigator.language;
            result = this.getAvailableLocale(language.split('-')[0]);
        } else {
            result = locales.find((item) => item === locale);
        }
        return result || defaultLocale;
    }

    static load(locale) {
        return new Promise((resolve, reject) => {
            fetch(`../locale/${this.getAvailableLocale(locale)}.json`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            }).then(response => {
                if (response.status === 200) {
                    resolve(response.json());
                } else {
                    reject({message: response.statusText});
                }
            });
        });
    }
}
