export default class ContextRecovery {

    constructor() {
        this.data = JSON.parse(sessionStorage.getItem('rbkmoney-checkout'));
        return this.getContext();
    }

    getContext() {
        return new Promise((resolve, reject) => {
            if (this.data) {
                return resolve(this.data);
            }
        });
    }
}
