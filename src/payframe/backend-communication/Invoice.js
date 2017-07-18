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
            })
                .then(response => {
                    if (response.status === 200) {
                        resolve(response.json());
                    } else {
                        response.json()
                            .then((error) => reject(error))
                            .catch(() => reject({ message: response.statusText }));
                    }
                });
        });
    }

    static createInvoice(params, template, locale) {
        return new Promise((resolve, reject) => {
            fetch(`${params.capiEndpoint}/v1/processing/invoices`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    'X-Request-ID': guid()
                },
                body: JSON.stringify({
                    invoiceParamsType: 'InvoiceParamsWithTemplate',
                    templateID: template.id,
                    amount: params.amount,
                    currency: template.cost.currency,
                    metadata: template.metadata
                })
            })
                .then(response => {
                    if (response.status === 201) {
                        resolve(response.json());
                    } else {
                        response.json()
                            .then((error) => reject(error))
                            .catch(() => reject({ message: locale['error.invoice.notCreated'] }));
                    }
                })
                .catch(() => { reject({ message: locale['error.invoice.notCreated'] }) });
        });
    }
}
