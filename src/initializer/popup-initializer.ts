import { Initializer } from './initializer';
import { initialize } from '../communicator';

const serialize = (params: any): string => {
    let urlParams = '';
    for (const prop in params) {
        if (params.hasOwnProperty(prop)) {
            const value = params[prop];
            if ((typeof value === 'function') || (value === undefined) || (value === null)) {
                continue;
            }
            if (urlParams !== '') {
                urlParams += '&';
            }
            urlParams += `${prop}=${encodeURIComponent(value)}`;
        }
    }
    return urlParams;
};

export class PopupInitializer extends Initializer {

    open() {
        const url = `${this.origin}/v1/checkout.html?${serialize(this.config)}`;
        const target = window.open(url);
        initialize(target, this.origin, 'checkout-initializer').then((transport) => {
            this.opened();
            transport.on('checkout-finished', () => {
                transport.destroy();
                this.finished();
            });
            transport.on('checkout-close', () => {
                transport.destroy();
                this.close();
            });
        });
    }

    close() {
        this.closed();
    }
}
