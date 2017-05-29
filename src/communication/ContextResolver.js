const STORAGE_PARAMS_KEY = 'rbkmoney-checkout';
const STORAGE_ORIGIN_KEY = 'rbkmoney-checkout-origin';

export default class ContextResolver {
    static setContext(context) {
        try {
            sessionStorage.setItem(STORAGE_PARAMS_KEY, JSON.stringify(context));
        } catch (e) {
            console.warn(e);
        }
    }

    static setOrigin(origin) {
        try {
            sessionStorage.setItem(STORAGE_ORIGIN_KEY, origin);
        } catch (e) {
            console.warn(e);
        }
    }

    static getContext() {
        try {
            return JSON.parse(sessionStorage.getItem(STORAGE_PARAMS_KEY));
        } catch (e) {
            console.warn(e);
        }
    }

    static getOrigin() {
        try {
            return sessionStorage.getItem(STORAGE_ORIGIN_KEY);
        } catch (e) {
            console.warn(e);
        }
    }

    static isAvailable() {
        try {
            return !!JSON.parse(sessionStorage.getItem(STORAGE_PARAMS_KEY));
        } catch (e) {
            console.warn(e);
        }
    }

    static removeContext() {
        try {
            sessionStorage.removeItem(STORAGE_PARAMS_KEY);
            sessionStorage.removeItem(STORAGE_ORIGIN_KEY);
        } catch (e) {
            console.warn(e);
        }
    }
}
