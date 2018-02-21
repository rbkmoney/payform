import { PossibleEvents, Parent } from '../communication';
import { Initializer } from './initializer';

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
        const parent = new Parent(target, this.origin);
        parent.sendHandshake().then((transport) => {
            this.opened();
            transport.on(PossibleEvents.done, () => {
                this.close();
                this.finished();
            });
            transport.on(PossibleEvents.close, () => {
                transport.destroy();
                this.close();
            });
        });
    }

    close() {
        this.closed();
    }
}
