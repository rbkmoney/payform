import guid from '../../checkout/utils/guid';

const errorMessage = 'An error when trying to request amount and currency.';

export default class Invoice {
    static getInvoice(capiEndpoint, invoiceID, accessToken) {
        return new Promise((resolve, reject) => {
            fetch(`${capiEndpoint}/v1/processing/invoices/${invoiceID}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    'Authorization': `Bearer ${accessToken}`,
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