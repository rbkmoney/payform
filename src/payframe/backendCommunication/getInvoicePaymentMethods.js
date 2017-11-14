import fetchCapi from '../../utils/fetchCapi';

/**
 * @param {Object} params
 * @param {string} params.capiEndpoint
 * @param {string} params.invoiceID
 * @param {string} params.accessToken
 * @return {Promise<InvoicePaymentMethods>} invoicePaymentMethods
 */
function getInvoicePaymentMethods(params) {
    return fetchCapi({
        endpoint: `${params.capiEndpoint}/v2/processing/invoices/${params.invoiceID}/payment-methods`,
        accessToken: params.accessToken
    });
}

export default getInvoicePaymentMethods;
