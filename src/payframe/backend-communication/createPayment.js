import guid from '../../utils/guid';

/**
 * @param {Object} param
 * @param {string} param.capiEndpoint
 * @param {string} param.invoiceID
 * @param {string} param.accessToken
 * @param {PaymentParams} param.paymentParams
 * @return {Promise<Payment>} payment
 */
function createPayment(param) {
    return new Promise((resolve, reject) => {
        fetch(`${param.capiEndpoint}/v1/processing/invoices/${param.invoiceID}/payments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': `Bearer ${param.accessToken}`,
                'X-Request-ID': guid()
            },
            body: JSON.stringify(param.paymentParams)
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

export default createPayment;
