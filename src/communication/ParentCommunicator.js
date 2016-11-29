export default class ParentCommunicator {

    static send(message) {
        const serialized = JSON.stringify(message);
        window.parent.postMessage(serialized, '*');
    }

    static sendWithTimeout(message, timeout) {
        setTimeout(() => this.send(message), timeout);
    }
}
