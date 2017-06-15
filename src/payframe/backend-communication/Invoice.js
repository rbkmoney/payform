import guid from '../../utils/guid';

export default class Invoice {
    static getInvoice(capiEndpoint, invoiceID, invoiceAccessToken) {
        return new Promise((resolve, reject) => {
            fetch(`${capiEndpoint}/v1/processing/invoices/${invoiceID}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    'Authorization': `Bearer ${invoiceAccessToken}`,
                    'X-Request-ID': guid()
                }
            }).then(response => {
                if (response.status >= 200 && response.status < 300) {
                    resolve(response.json());
                } else {
                    reject(response.statusText);
                }
            });
        });
    }
}
