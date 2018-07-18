import { Transport } from './transport';

const parse = (data: any): any => {
    let parsed;
    try {
        parsed = JSON.parse(data);
        /* tslint:disable:no-empty */
    } catch (e) {
    }
    return parsed;
};

const transportListener = (transportName: string, events: any, e: MessageEvent) => {
    const parsed = parse(e.data);
    if (parsed && (parsed.name in events)) {
        if (parsed.transport === transportName) {
            events[parsed.name].call(this, parsed.data);
        }
    }
};

export class RealTransport implements Transport {

    private readonly events: any = {};
    private readonly transportListener: any;

    constructor(
        private readonly target: Window,
        private readonly origin: string,
        private readonly transportName = 'default-communicator-transport'
    ) {
        this.transportListener = transportListener.bind(this, this.transportName, this.events);
        window.addEventListener('message', this.transportListener, false);
    }

    emit(eventName: string, data?: object): void {
        const serialized = JSON.stringify({
            data,
            name: eventName,
            transport: this.transportName
        });
        this.target.postMessage(serialized, this.origin);
    }

    on(eventName: string, callback: (data: object) => void): void {
        this.events[eventName] = callback;
    }

    destroy(): void {
        window.removeEventListener('message', this.transportListener, false);
    }
}
