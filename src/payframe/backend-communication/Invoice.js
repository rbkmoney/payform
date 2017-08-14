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
            }).then((response) => {
                if (response.status === 200) {
                    resolve(response.json());
                } else {
                    response.json()
                        .then((error) => reject(error))
                        .catch(() => reject(response));
                }
            }).catch((error) => reject(error));
        });
    }

    static createInvoice(capiEndpoint, invoiceTemplateID, invoiceTemplateAccessToken, invoiceParams) {
        return new Promise((resolve, reject) => {
            fetch(`${capiEndpoint}/v1/processing/invoice-templates/${invoiceTemplateID}/invoices`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    'Authorization': `Bearer ${invoiceTemplateAccessToken}`,
                    'X-Request-ID': guid()
                },
                body: JSON.stringify({
                    amount: invoiceParams.amount,
                    currency: invoiceParams.currency,
                    metadata: invoiceParams.metadata
                })
            }).then(response => {
                if (response.status === 201) {
                    resolve(response.json());
                } else {
                    response.json()
                        .then((error) => reject(error))
                        .catch(() => reject(response));
                }
            }).catch((error) => reject(error));
        });
    }
}
