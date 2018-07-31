import { initialize, Transport } from 'cross-origin-communicator';
import { communicatorInstanceName, ConnectData, Event, ResultData, Type } from '../constants/samsung-pay-communicator';
import { deserialize } from '../app/utils/uri-serializer';

declare const SamsungPay: {
    connect: (transactionId: string, href: string, serviceId: string, callbackURL: string, cancelURL: string, countryCode: 'br' | 'ru' | 'se' | 'uk' | 'us' | 'kr', publicKeyMod: string,
              publicKeyExp: string, keyId: string) => {}
};

class App {
    private transport: Transport;

    async start() {
        try {
            let params: { type?: Type, refId?: string };
            try {
                params = deserialize(window.document.location.href);
            } catch (e) {
                params = {};
            }
            this.transport = await initialize(window.parent.window, window.location.origin, communicatorInstanceName);
            if (params.refId) {
                this.success(params.refId);
            } else if (params.type === Type.ERROR) {
                this.error('error.samsung.pay.cancel');
            } else {
                this.connect();
            }
        } catch (e) {
            console.error(e);
        }
    }

    private connect() {
        this.transport.on(Event.CONNECT, (data: ConnectData) => {
            try {
                SamsungPay.connect(
                    data.transactionId,
                    data.href,
                    data.serviceId,
                    data.callbackURL,
                    data.cancelURL,
                    data.countryCode,
                    data.publicKeyMod,
                    data.publicKeyExp,
                    data.keyId
                );
            } catch (e) {
                this.error('error.samsung.pay.not.available');
            }
        });
        this.transport.emit(Event.CONNECT);
    }

    private success(refId: string) {
        const resultData: ResultData = {type: Type.SUCCESS, refId};
        this.transport.emit(Event.RESULT, resultData);
    }

    private error(code: string = 'error.samsung.pay.cancel') {
        const resultData: ResultData = {type: Type.ERROR, code};
        this.transport.emit(Event.RESULT, resultData);
    }
}

(new App()).start();
