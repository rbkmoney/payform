import 'whatwg-fetch';
import moment from 'moment';
import settings from '../../settings';

export default class LocaleLoader {
    static getAvailableLocales(locale) {
        const locales = ['ru', 'en'];

        if (locale === 'auto') {
            locale = moment.locale('auto');
        }

        for (let i = 0; i < locales.length; i++) {
            if (locales[i] === locale) {
                return locale;
            }
        }

        return settings.defaultLocale;
    }

    static load(locale) {
        return new Promise((resolve, reject) => {
            locale = this.getAvailableLocales(locale);

            fetch(`../languages/${moment.locale(locale)}.json`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            }).then(response => {
                if (response.status >= 200 && response.status < 300) {
                    resolve(response.json());
                } else {
                    reject({message: response.statusText});
                }
            });
        });
    }
}
