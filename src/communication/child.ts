import {
    RealTransport,
    Transport,
    ContextResolver,
    StubTransport,
    TransportInfo
} from '.';
import { isInFrame } from '../is-in-iframe';

export class Child {

    static resolve(): Promise<Transport> {
        return new Promise((resolve) => {
            if (ContextResolver.isAvailable() && window.opener) {
                const target = window.opener;
                const context = ContextResolver.get();
                return resolve(new RealTransport(target, context.parentOrigin, window));
            } else if (isInFrame() && !window.opener) {
                return resolve(new StubTransport());
            } else {
                const shake = (e: MessageEvent) => {
                    if (e && e.data === TransportInfo.parentHandshakeMessageName) {
                        const target = e.source;
                        target.postMessage(TransportInfo.childHandshakeMessageName, e.origin);
                        ContextResolver.set({
                            parentOrigin: e.origin
                        });
                        return resolve(new RealTransport(target, e.origin, window));
                    }
                };
                window.addEventListener('message', shake, false);
            }
        });
    }
}
