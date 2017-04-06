export default class StateWorker {

    static saveState(payformState) {
        sessionStorage.setItem('payformState', JSON.stringify(payformState));
    }

    static loadState() {
        let storagedState = null;
        const storagedStateStr = sessionStorage.getItem('payformState');
        try {
            storagedState = JSON.parse(storagedStateStr);
        } catch (e) {}
        return storagedState;
    }

    static init3DS(invoiceId) {
        sessionStorage.setItem(invoiceId, JSON.stringify({
            status: '3ds',
            timestamp: new Date()
        }));
    }

    static is3DSInProgress(invoiceId) {
        const value = sessionStorage.getItem(invoiceId);
        let result = false;
        if (value) {
            const info = JSON.parse(value);
            result = info.status === '3ds';
        }
        return result;
    }

    static flush() {
        sessionStorage.clear();
    }
}
