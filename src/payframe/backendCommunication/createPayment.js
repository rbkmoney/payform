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
    return fetchCapi({
        endpoint: `${param.capiEndpoint}/v2/processing/invoices/${param.invoiceID}/payments`,
        accessToken: param.accessToken,
        method: 'POST',
        body: param.paymentParams
    });
}

export default createPayment;
