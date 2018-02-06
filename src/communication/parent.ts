import { RealTransport } from './real-transport';
import { Transport } from './transport';

export class Parent {

    private target: Window;
    private origin: string;
    private parent: Window;

    constructor(target: Window, origin: string) {
        this.target = target;
        this.origin = origin;
        this.parent = window;
    }

    sendHandshake(): Promise<Transport> {
        let interval: any;
        return new Promise((resolve, reject) => {
            const reply = (e: any) => {
                if (e.data === 'rbkmoney-payframe-handshake') {
                    clearInterval(interval);
                    return resolve(new RealTransport(this.target, this.origin, this.parent));
                }
            };
            this.parent.addEventListener('message', reply, false);
            let attempt = 0;
            const maxHandshakeRequests = 20;
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
