import { RealTransport } from './real-transport';
import { Transport } from './transport';
import { log } from './log';
import { Constants } from './constants';

const timeout = (ms: number): Promise<Transport> =>
    new Promise((resolve, reject) => {
        const id = setTimeout(() => {
            clearTimeout(id);
            reject('listener handshake timed out in ' + ms + 'ms.');
        }, ms);
    });

const handleHandshake = (transportName: string, isLog: boolean = false): Promise<Transport> =>
    new Promise((resolve) => {
        const shake = (e: MessageEvent) => {
            if (e && e.data === Constants.initializerHandName) {
                const target = e.source;
                target.postMessage(Constants.listenerHandName, e.origin);
                if (isLog) {
                    log('listener receive initializer hand');
                }
                window.removeEventListener('message', shake, false);
                return resolve(new RealTransport(target, e.origin, transportName));
            }
        };
        window.addEventListener('message', shake, false);
    });

const handleHandshakeWithTimeout = (transportName: string, ms: number, isLog: boolean = false): Promise<Transport> =>
    Promise.race<Transport>([
        timeout(ms),
        handleHandshake(transportName, isLog)
    ]);

export const listen = (transportName: string, ms: number = null, isLog: boolean = false): Promise<Transport> => {
    return ms === null || ms === undefined
        ? handleHandshake(transportName, isLog)
        : handleHandshakeWithTimeout(transportName, ms, isLog);
};
