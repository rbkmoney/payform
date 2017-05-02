import Transport from './Transport';
import settings from '../settings';

export default class Parent {

    constructor(target, origin) {
        this.target = target;
        this.origin = origin;
        this.parent = window;
        return this.sendHandshake();
    }

    sendHandshake() {
        let interval;
        return new Promise((resolve, reject) => {
            const reply = (e) => {
                if (e.data === 'rbkmoney-payframe-handshake') {
                    clearInterval(interval);
                    return resolve(new Transport(this.target, this.origin, this.parent));
                }
            };
            this.parent.addEventListener('message', reply, false);

            let attempt = 0;
            const maxHandshakeRequests = settings.maxHandshakeRequests;
            const doSend = () => {
                attempt++;
                this.target.postMessage('rbkmoney-checkout-handshake', this.origin);
                if (attempt === maxHandshakeRequests) {
                    clearInterval(interval);
                    return reject('failed handshake');
                }
            };
            interval = setInterval(doSend, 500);
        });
    }
}
