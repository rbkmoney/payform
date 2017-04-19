import Transport from './Transport';

export default class Child {

    constructor() {
        this.child = window;
        return this.sendHandshakeReply();
    }

    sendHandshakeReply() {
        return new Promise((resolve) => {
            const shake = (e) => {
                if (e.data === 'rbkmoney-checkout-handshake') {
                    const target = e.source;
                    target.postMessage('rbkmoney-payframe-handshake', e.origin);
                    return resolve(new Transport(target, e.origin, this.child));
                }
            };
            this.child.addEventListener('message', shake, false);
        });
    }
}
