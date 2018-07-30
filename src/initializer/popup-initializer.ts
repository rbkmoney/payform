import { initialize } from 'cross-origin-communicator';
import { Initializer } from './initializer';
import { CommunicatorEvents, communicatorInstanceName } from '../communicator-constants';

export const serialize = (params: any): string => {
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
        initialize(target, this.origin, communicatorInstanceName).then((transport) => {
            this.opened();
            transport.on(CommunicatorEvents.finished, () => {
                transport.destroy();
                this.finished();
            });
            transport.on(CommunicatorEvents.close, () => {
                transport.destroy();
                this.close();
            });
        });
    }

    close() {
        this.closed();
    }
}
