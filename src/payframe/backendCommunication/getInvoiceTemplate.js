import fetchCapi from '../../utils/fetchCapi';

/**
 * @param {Object} param
 * @param {string} param.capiEndpoint
 * @param {string} param.accessToken
 * @param {string} param.invoiceTemplateID
 * @return {Promise<InvoiceTemplate>} invoiceTemplate
 */
function getInvoiceTemplate(param) {
    return fetchCapi({
        endpoint: `${param.capiEndpoint}/v1/processing/invoice-templates/${param.invoiceTemplateID}`,
        accessToken: param.accessToken
    });
}

export default getInvoiceTemplate;
