import fetchCapi from '../../utils/fetchCapi';

/**
 * @param {Object} param
 * @param {string} param.capiEndpoint
 * @param {string} param.customerID
 * @param {string} param.accessToken
 * @return {Promise<Customer>} customer
 */
function getCustomer(param) {
    return fetchCapi({
        endpoint: `${param.capiEndpoint}/v2/processing/customers/${param.customerID}`,
        accessToken: param.accessToken
    });
}

export default getCustomer;
