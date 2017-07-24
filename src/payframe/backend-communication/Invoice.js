import guid from '../../utils/guid';

export default class Invoice {
    static getInvoice(capiEndpoint, invoiceID, invoiceAccessToken, locale) {
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
                            .catch(() => reject({ message: locale['error.invoice.getInvoice'] }));
                    }
                });
        });
    }

    static createInvoice(params, template, locale) {
        return new Promise((resolve, reject) => {
            fetch(`${params.capiEndpoint}/v1/processing/invoice-templates/${template.id}/invoices`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    'Authorization': `Bearer ${params.invoiceTemplateAccessToken}`,
                    'X-Request-ID': guid()
                },
                body: JSON.stringify({
                    amount: params.amount,
                    currency: params.currency,
                    metadata: template.metadata || {},
                    cost: template.cost,
                    lifetime: template.lifetime
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
