export default class StateInspector {

    static initLeaving(invoiceId) {
        localStorage.setItem(invoiceId, JSON.stringify({
            status: 'inProgress',
            timestamp: new Date()
        }));
    }

    static isInProgress(invoiceId) {
        const value = localStorage.getItem(invoiceId);
        let result = false;
        if (value) {
            const info = JSON.parse(value);
            result = info.status === 'inProgress';
        }
        return result;
    }

    static resolve(invoiceId) {
        const value = localStorage.getItem(invoiceId);
        if (value) {
            const info = JSON.parse(value);
            info.status = 'done';
            info.timestamp = new Date();
            localStorage.setItem(invoiceId, JSON.stringify(info));
            localStorage.clear(); // TODO Fix it
        }
    }
}
