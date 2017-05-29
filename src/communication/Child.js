import Transport from './Transport';

export default class Child {

    constructor() {
        this.child = window;
        this.data = JSON.parse(sessionStorage.getItem('rbkmoney-checkout'));
        return this.sendHandshakeReply();
    }

    sendHandshakeReply() {
        return new Promise((resolve) => {
            if (this.data) {
                const target = window.opener;
                const origin = sessionStorage.getItem('rbkmoney-checkout-origin');
                return resolve(new Transport(target, origin, this.child));
            }
            const shake = (e) => {
                if (e.data === 'rbkmoney-checkout-handshake') {
                    const target = e.source;
                    target.postMessage('rbkmoney-payframe-handshake', e.origin);
                    sessionStorage.setItem('rbkmoney-checkout-origin', e.origin);
                    return resolve(new Transport(target, e.origin, this.child));
                }
            };
            this.child.addEventListener('message', shake, false);
        });
    }
}
