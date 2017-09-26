import fetchCapi from '../../utils/fetchCapi';

/**
 * @param {Object} param
 * @param {string} param.capiEndpoint
 * @param {string} param.invoiceID
 * @param {string} param.accessToken
 * @param {PaymentParams} param.paymentParams
 * @return {Promise<Payment>} payment
 */
function createPayment(param) {
    console.log(param);
    return fetchCapi({
        endpoint: `${param.capiEndpoint}/v1/processing/invoices/${param.invoiceID}/payments`,
        accessToken: param.accessToken,
        method: 'POST',
        body: param.paymentParams
    });
}

export default createPayment;
