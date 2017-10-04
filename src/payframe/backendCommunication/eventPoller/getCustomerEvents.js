import fetchCapi from '../../../utils/fetchCapi';

/**
 * @param {Object} param
 * @param {string} param.capiEndpoint
 * @param {string} param.customerID
 * @param {string} param.accessToken
 * @param {number} param.eventLimit
 * @return {Promise<Event[]>} events
 */
function getCustomerEvents(param) {
    return fetchCapi({
        endpoint: `${param.capiEndpoint}/v1/processing/customers/${param.customerID}/events?limit=${param.eventLimit}`,
        accessToken: param.accessToken
    });
}

export default getCustomerEvents;
