const key = 'checkout-context';

export default class ContextResolver {

    static set(context) {
        try {
            sessionStorage.setItem(key, JSON.stringify(context));
        } catch (e) {
            console.warn(e);
        }
    }

    static get() {
        try {
            return JSON.parse(sessionStorage.getItem(key));
        } catch (e) {
            console.warn(e);
        }
    }

    static isAvailable() {
        try {
            return !!JSON.parse(sessionStorage.getItem(key));
        } catch (e) {
            console.warn(e);
        }
    }
}
