const STORAGE_PARAMS_KEY = 'rbkmoney-checkout';
const STORAGE_ORIGIN_KEY = 'rbkmoney-checkout-origin';

export default class ContextResolver {
    static setContext(context) {
        sessionStorage.setItem(STORAGE_PARAMS_KEY, JSON.stringify(context));
    }

    static setOrigin(origin) {
        sessionStorage.setItem(STORAGE_ORIGIN_KEY, origin);
    }

    static getContext() {
        return JSON.parse(sessionStorage.getItem(STORAGE_PARAMS_KEY));
    }

    static getOrigin() {
        return sessionStorage.getItem(STORAGE_ORIGIN_KEY);
    }

    static isAvaible() {
        return !!JSON.parse(sessionStorage.getItem(STORAGE_PARAMS_KEY));
    }

    static removeContext() {
        sessionStorage.removeItem(STORAGE_PARAMS_KEY);
        sessionStorage.removeItem(STORAGE_ORIGIN_KEY);
    }
}
