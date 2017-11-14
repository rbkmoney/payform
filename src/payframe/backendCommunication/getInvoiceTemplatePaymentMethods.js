import fetchCapi from '../../utils/fetchCapi';

/**
 * @param {Object} params
 * @param {string} params.capiEndpoint
 * @param {string} params.invoiceTemplateID
 * @param {string} params.accessToken
 * @return {Promise<InvoicePaymentMethods>} invoicePaymentMethods
 */
function getInvoiceTemplatePaymentMethods(params) {
    return fetchCapi({
        endpoint: `${params.capiEndpoint}/v2/processing/invoice-templates/${params.invoiceTemplateID}/payment-methods`,
        accessToken: params.accessToken
    });
}

export default getInvoiceTemplatePaymentMethods;
