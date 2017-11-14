import fetchCapi from '../../../utils/fetchCapi';

/**
 * @param {Object} param
 * @param {string} param.capiEndpoint
 * @param {string} param.customerID
 * @param {string} param.accessToken
 * @param {number} param.eventLimit
 * @param {string} param.eventID
 * @return {Promise<Event[]>} events
 */
function getCustomerEvents(param) {
    return fetchCapi({
        endpoint: `${param.capiEndpoint}/v2/processing/customers/${param.customerID}/events?limit=${param.eventLimit}${param.eventID ? '&eventID=' + param.eventID : ''}`,
        accessToken: param.accessToken
    });
}

export default getCustomerEvents;
