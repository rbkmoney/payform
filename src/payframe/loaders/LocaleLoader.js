import 'whatwg-fetch';
import moment from 'moment';
import settings from '../../settings';

export default class LocaleLoader {
    static getAvailableLocale(locale) {
        let availableLocale = locale;
        let result;
        const locales = ['ru', 'en'];
        if (locale === 'auto') {
            availableLocale = moment.locale('auto');
        }
        locales.find(item => {
           if (item === availableLocale) {
               result =  availableLocale;
           }
        });
        return result || settings.defaultLocale;
    }

    static load(locale) {
        return new Promise((resolve, reject) => {
            const avaibleLocale = this.getAvailableLocale(locale);
            fetch(`../locale/${avaibleLocale}.json`, {
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
