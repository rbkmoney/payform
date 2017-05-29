import Transport from './Transport';
import ContextResolver from './ContextResolver';

export default class Child {

    constructor() {
        this.child = window;
        return this.sendHandshakeReply();
    }

    sendHandshakeReply() {
        return new Promise((resolve) => {
            if (ContextResolver.isAvailable()) {
                const target = window.opener;
                const origin = ContextResolver.getOrigin();
                return resolve(new Transport(target, origin, this.child));
            }
            const shake = (e) => {
                if (e.data === 'rbkmoney-checkout-handshake') {
                    const target = e.source;
                    target.postMessage('rbkmoney-payframe-handshake', e.origin);
                    ContextResolver.setOrigin(e.origin);
                    return resolve(new Transport(target, e.origin, this.child));
                }
            };
            this.child.addEventListener('message', shake, false);
        });
    }
}
