import { Transport, TransportInfo, PossibleEvents, TransportMessage } from '.';

export class RealTransport implements Transport {

    private target: Window;
    private origin: string;
    private events: any = {};

    constructor(target: Window, origin: string, source: Window) {
        this.target = target;
        this.origin = origin;
        source.addEventListener('message', this.listener.bind(this), false);
    }

    emit(name: PossibleEvents, data?: any) {
        const serialized = JSON.stringify({
            data,
            name,
            transport: TransportInfo.transportName
        } as TransportMessage);
        this.target.postMessage(serialized, this.origin);
    }

    on(eventName: PossibleEvents, callback: (data: any) => any) {
        this.events[eventName] = callback;
    }

    destroy() {
        window.removeEventListener('message', this.listener.bind(this), false);
        this.events = {};
    }

    private listener(e: MessageEvent) {
        let parsed: TransportMessage;
        try {
            parsed = JSON.parse(e.data);
        /* tslint:disable:no-empty */
        } catch (e) {}
        if (parsed && (parsed.name in this.events)) {
            if (parsed.transport === TransportInfo.transportName) {
                this.events[parsed.name].call(this, parsed.data);
            }
        }
    }
}
