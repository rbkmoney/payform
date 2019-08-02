import { initialize } from 'cross-origin-communicator';

import { Initializer } from './initializer';
import { CommunicatorEvents, communicatorInstanceName } from '../communicator-constants';
import { OpenConfig } from '../app/config';

export const serialize = (params: { [name: string]: any }): string => {
    const urlParams: string[] = [];
    for (const prop in params) {
        if (params.hasOwnProperty(prop)) {
            let value = params[prop];
            if (typeof value === 'function' || value === undefined || value === null) {
                continue;
            }
            if (typeof value === 'object') {
                try {
                    value = JSON.stringify(value);
                } catch (e) {
                    console.error(e);
                    continue;
                }
            }
            urlParams.push(`${prop}=${encodeURIComponent(value)}`);
        }
    }
    return urlParams.join('&');
};

export class PopupInitializer extends Initializer {
    open(openConfig: OpenConfig = {}) {
        const url = `${this.origin}/v1/checkout.html?${serialize({ ...this.config, ...openConfig })}`;
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
