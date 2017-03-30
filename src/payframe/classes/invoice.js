import guid from '../../checkout/utils/guid';

const errorMessage = 'An error when trying to request amount and currency.';

export default class Invoice {
    constructor(params) {
        this.params = params;

        this.getInfo = this.getInfo.bind(this);
    }

    getInfo() {
        return new Promise((resolve, reject) => {
            fetch(`${'http://api.rbk.test:8080'}/v1/processing/invoices/${this.params.invoiceId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    'Authorization': `Bearer ${this.params.accessToken}`,
                    'X-Request-ID': guid()
                }
            }).then(response => {
                if (response.status >= 200 && response.status < 300) {
                    resolve(response.json());
                } else {
                    reject(errorMessage);
                }
            });
        });
    }
}
