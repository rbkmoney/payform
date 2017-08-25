import fetchCapi from '../../utils/fetchCapi';

/**
 * @param {Object} param
 * @param {string} param.capiEndpoint
 * @param {string} param.invoiceID
 * @param {string} param.accessToken
 * @return {Promise<Invoice>} invoice
 */
function getInvoice(param) {
    return fetchCapi({
        endpoint: `${param.capiEndpoint}/v1/processing/invoices/${param.invoiceID}`,
        accessToken: param.accessToken
    });
}

export default getInvoice;
