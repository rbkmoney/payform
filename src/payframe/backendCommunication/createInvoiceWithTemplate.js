import fetchCapi from '../../utils/fetchCapi';

/**
 * @param {Object} param
 * @param {string} param.capiEndpoint
 * @param {string} param.accessToken
 * @param {string} param.invoiceTemplateID
 * @param {InvoiceParamsWithTemplate} param.invoiceParamsWithTemplate
 * @return {Promise<Invoice>} invoice
 */
function createInvoiceWithTemplate(param) {
    return fetchCapi({
        endpoint: `${param.capiEndpoint}/v2/processing/invoice-templates/${param.invoiceTemplateID}/invoices`,
        accessToken: param.accessToken,
        method: 'POST',
        body: param.invoiceParamsWithTemplate
    });
}

export default createInvoiceWithTemplate;

