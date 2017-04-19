export default class Transport {

    constructor(target, origin, source) {
        this.target = target;
        this.origin = origin;
        this.events = {};
        source.addEventListener('message', (e) => {
            let parsed;
            try {
                parsed = JSON.parse(e.data);
            } catch (e) {}
            if (parsed && (parsed.name in this.events)) {
                if (parsed.transport === 'rbkmoney-checkout') {
                    this.events[parsed.name].call(this, parsed.data);
                }
            }
        }, false);
    }

    emit(name, data) {
        const serialized = JSON.stringify({
            transport: 'rbkmoney-checkout',
            name: name,
            data: data
        });
        this.target.postMessage(serialized, this.origin);
    }

    on(eventName, callback) {
        this.events[eventName] = callback;
    }
}
