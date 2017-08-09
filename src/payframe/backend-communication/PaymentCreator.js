import guid from '../../utils/guid';

class PaymentCreator {

    // error.payment.create
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
                    flow: {type: 'PaymentParamsFlowInstant'},
                    paymentToolToken: tokenizerToken.token,
                    paymentSession: tokenizerToken.session,
                    contactInfo: {
                        email: email
                    }
                })
            }).then((response) => {
                if (response.status === 201) {
                    resolve();
                } else {
                    response.json()
                        .then((error) => reject(error))
                        .catch(() => reject(response));
                }
            }).catch((error) => reject(error));
        });
    }
}

export default PaymentCreator;
