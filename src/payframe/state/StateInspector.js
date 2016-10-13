export default class StateInspector {

    static initLeaving(invoiceId) {
        console.info('StateInspector initLeaving start, storage:', localStorage);
        localStorage.setItem(invoiceId, JSON.stringify({
            status: 'inProgress',
            timestamp: new Date()
        }));
        console.info('StateInspector initLeaving end, storage:', localStorage);
    }

    static isInProgress(invoiceId) {
        console.info('StateInspector isInProgress start, storage:', localStorage);
        const value = localStorage.getItem(invoiceId);
        let result = false;
        if (value) {
            const info = JSON.parse(value);
            result = info.status === 'inProgress';
        }
        console.info('StateInspector isInProgress end, result:', result);
        return result;
    }

    static resolve(invoiceId) {
        console.info('StateInspector resolve start, storage:', localStorage);
        const value = localStorage.getItem(invoiceId);
        if (value) {
            const info = JSON.parse(value);
            info.status = 'done';
            info.timestamp = new Date();
            localStorage.setItem(invoiceId, JSON.stringify(info));
            localStorage.clear(); // TODO Fix it
        }
        console.info('StateInspector resolve end, storage:', localStorage);
    }
}
