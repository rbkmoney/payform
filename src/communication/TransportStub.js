export default class TransportStub {

    emit(name, data) {
        console.info('transport stub emit: ', name, data);
    }

    on(eventName, callback) {
        console.info('transport stub on: ', eventName, callback);
    }

    destroy() {
        console.info('transport stub destroy');
    }
}
