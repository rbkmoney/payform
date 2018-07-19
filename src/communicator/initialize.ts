import { RealTransport } from './real-transport';
import { Transport } from './transport';
import { log } from './log';
import { Constants } from './constants';

export const initialize = (target: Window, origin: string, transportName: string, isLog: boolean = false): Promise<Transport> => {
    let interval: number;
    return new Promise((resolve, reject) => {
        const reply = (e: any) => {
            if (e.data === Constants.listenerHandName) {
                if (isLog) {
                    log('initializer receive listener hand');
                }
                window.clearInterval(interval);
                window.removeEventListener('message', reply, false);
                return resolve(new RealTransport(target, origin, transportName));
            }
        };
        window.addEventListener('message', reply, false);
        let attempt = 0;
        const doSend = () => {
            attempt++;
            target.postMessage(Constants.initializerHandName, origin);
            if (isLog) {
                log('initializer send handshake attempt');
            }
            if (attempt === 10) {
                clearInterval(interval);
                return reject('communicator handshake failed');
            }
        };
        interval = window.setInterval(doSend, 500);
    });
};
