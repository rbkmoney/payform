import fetchCapi from '../../../utils/fetchCapi';

/**
 * @param {Object} param
 * @param {string} param.capiEndpoint
 * @param {string} param.invoiceID
 * @param {string} param.accessToken
 * @param {number} param.eventLimit
 * @return {Promise<Event[]>} events
 */
function getInvoiceEvents(param) {
    return fetchCapi({
        endpoint: `${param.capiEndpoint}/v1/processing/invoices/${param.invoiceID}/events?limit=${param.eventLimit}${param.eventID ? '&eventID=' + param.eventID : ''}`,
        accessToken: param.accessToken
    });
}

export default getInvoiceEvents;
