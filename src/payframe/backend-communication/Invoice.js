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
                if (response.status === 200) {
                    resolve(response.json());
                } else {
                    response.json()
                        .then((error) => reject(error))
                        .catch(() => reject({message: response.statusText}));
                }
            });
        });
    }

    static createInvoice(capiEndpoint, invoiceParamsType, templateID, amount, currency, metadata) {
        return new Promise((resolve, reject) => {
           fetch(`${capiEndpoint}/v1/processing/invoices`, {
               method: 'POST',
               headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    'X-Request-ID': guid()
               },
               body: {
                   invoiceParamsType,
                   templateID,
                   amount,
                   currency,
                   metadata
               }
           })
               .then(response => {
                   if (response.status === 201) {
                    resolve(response.json());
                    } else {
                        response.json()
                            .then((error) => reject(error))
                            .catch(() => reject({message: response.statusText}));
                    }
               })
               .catch(error => {
                   reject({message: error.message});
               })
        });
    }
}
