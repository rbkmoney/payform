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

    static init3DS(invoiceID) {
        sessionStorage.setItem(invoiceID, JSON.stringify({
            status: '3ds',
            timestamp: new Date()
        }));
    }

    static is3DSInProgress(invoiceID) {
        const value = sessionStorage.getItem(invoiceID);
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
