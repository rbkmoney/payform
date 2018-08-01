import { Transport } from 'cross-origin-communicator';

export class StubTransport implements Transport {
    emit(eventName: string, data?: object) {
        console.info('transport stub emit: ', name, data);
    }

    on(eventName: string, callback: (data: object) => void): void {
        callback({});
        console.info('transport stub on: ', eventName, callback);
    }

    destroy() {
        console.info('transport stub destroy');
    }
}
