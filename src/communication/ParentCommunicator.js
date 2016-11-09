export default class ParentCommunicator {

    send(message) {
        const serialized = JSON.stringify(message);
        window.parent.postMessage(serialized, '*');
    }

    sendWithTimeout(message, timeout) {
        setTimeout(() => this.send(message), timeout);
    }
}
