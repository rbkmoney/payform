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
        localStorage.removeItem(invoiceId);
    }
}
