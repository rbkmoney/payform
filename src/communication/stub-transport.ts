import { Transport, PossibleEvents } from '.';

export class StubTransport implements Transport {

    emit(name: PossibleEvents, data: any) {
        console.info('transport stub emit: ', name, data);
    }

    on(eventName: PossibleEvents, callback: (data: any) => any) {
        callback({});
        console.info('transport stub on: ', eventName, callback);
    }

    destroy() {
        console.info('transport stub destroy');
    }
}
