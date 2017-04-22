import guid from '../../utils/guid';

const errorMassage = 'An error occurred while trying create payment';

class PaymentCreator {

    static create(capiEndpoint, invoiceID, invoiceAccessToken, tokenizerToken, email) {
        return new Promise((resolve, reject) => {
            fetch(`${capiEndpoint}/v1/processing/invoices/${invoiceID}/payments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    'Authorization': `Bearer ${invoiceAccessToken}`,
                    'X-Request-ID': guid()
                },
                body: JSON.stringify({
                    paymentToolToken: tokenizerToken.token,
                    paymentSession: tokenizerToken.session,
                    contactInfo: {
                        email: email
                    }
                })
            }).then(response => {
                if (response.status >= 200 && response.status < 300) {
                    resolve();
                } else {
                    reject({message: errorMassage});
                }
            }).catch(() => {
                reject({message: errorMassage});
            })
        });
    }
}

export default PaymentCreator;
