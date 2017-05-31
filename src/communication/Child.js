import Transport from './Transport';
import ContextResolver from './ContextResolver';
import TransportStub from './TransportStub';

export default class Child {

    constructor() {
        this.child = window;
        return this.resolve();
    }

    resolve() {
        return new Promise((resolve) => {
            if (ContextResolver.isAvailable() && window.opener) {
                const target = window.opener;
                const context = ContextResolver.get();
                return resolve(new Transport(target, context.parentOrigin, this.child));
            } else if (!this.inIframe() && !window.opener) {
                return resolve(new TransportStub());
            } else {
                const shake = (e) => {
                    if (e.data === 'rbkmoney-checkout-handshake') {
                        const target = e.source;
                        target.postMessage('rbkmoney-payframe-handshake', e.origin);
                        ContextResolver.set({
                            parentOrigin: e.origin
                        });
                        return resolve(new Transport(target, e.origin, this.child));
                    }
                };
                this.child.addEventListener('message', shake, false);
            }
        });
    }

    inIframe() {
        try {
            return window.self !== window.top;
        } catch (e) {
            return true;
        }
    }
}
