import guid from '../../utils/guid';

export default class InvoiceTemplate {
    static getInvoiceTemplate(capiEndpoint, invoiceTemplateID) {
        return new Promise((resolve, reject) => {
            fetch(`${capiEndpoint}/v1/processing/invoice-templates/${invoiceTemplateID}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    'X-Request-ID': guid()
                }
            })
                .then(response => {
                    if (response.status === 200) {
                        resolve(response.json());
                    } else {
                        response.json()
                            .then((error) => reject(error))
                            .catch(() => reject({message: response.statusText}));
                    }
                })
                .catch(e => {
                    reject({message: e.message})
                });
        });
    }
}
