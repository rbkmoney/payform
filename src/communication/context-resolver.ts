export class ContextResolver {

    static set(context: any) {
        try {
            sessionStorage.setItem(this.key, JSON.stringify(context));
        /* tslint:disable:no-empty */
        } catch (e) {}
    }

    static get(): any {
        try {
            return JSON.parse(sessionStorage.getItem(this.key));
        /* tslint:disable:no-empty */
        } catch (e) {}
    }

    static isAvailable(): boolean {
        try {
            return !!JSON.parse(sessionStorage.getItem(this.key));
        /* tslint:disable:no-empty */
        } catch (e) {}
    }

    private static key = 'checkout-context';
}
