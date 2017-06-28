import 'whatwg-fetch';
const locales = ['ru', 'en'];
const defaultLocale = 'en';

export default class LocaleLoader {
    static getAvailableLocale(locale) {
        let result;
        if (locale === 'auto' || locale === undefined) {
            result = this.getAvailableLocale(navigator.language.split('-')[0]);
        } else {
            result = this.getLocales().find((item) => item === locale);
        }
        return result || this.getDefaultLocale();
    }

    static getDefaultLocale() {
        return defaultLocale;
    }

    static getLocales() {
        return locales;
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
