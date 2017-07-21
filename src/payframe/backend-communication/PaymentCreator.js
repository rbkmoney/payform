import guid from '../../utils/guid';

class PaymentCreator {

    static create(capiEndpoint, invoiceID, invoiceAccessToken, tokenizerToken, email, locale) {
        return new Promise((resolve, reject) => {
            fetch(`${capiEndpoint}/v1/processing/invoices/${invoiceID}/payments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    'Authorization': `Bearer ${invoiceAccessToken}`,
                    'X-Request-ID': guid()
                },
                body: JSON.stringify({
                    flow: {
                        type: 'PaymentParamsFlowInstant'
                    },
                    paymentToolToken: tokenizerToken.token,
                    paymentSession: tokenizerToken.session,
                    contactInfo: {
                        email: email
                    }
                })
            }).then(response => {
                if (response.status === 201) {
                    resolve();
                } else {
                    reject({message: locale['error.payment.create']});
                }
            }).catch(() => {
                reject({message: locale['error.payment.create']});
            })
        });
    }
}

export default PaymentCreator;
