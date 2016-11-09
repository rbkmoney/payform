export default class CheckoutCommunicator {

    constructor(iframeName, iframeSrc) {
        this.name = iframeName;
        this.src = iframeSrc;
    }

    send(message) {
        const serialized = JSON.stringify(message);
        window.frames[this.name].postMessage(serialized, this.src);
    }
}
