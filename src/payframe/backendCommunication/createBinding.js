import fetchCapi from '../../utils/fetchCapi';

/**
 * @param {Object} param
 * @param {string} param.capiEndpoint
 * @param {string} param.customerID
 * @param {string} param.accessToken
 * @param {PaymentResource} param.paymentResource
 * @return {Promise<CustomerBinding>} customerBinding
 */
function createBinding(param) {
    return fetchCapi({
        endpoint: `${param.capiEndpoint}/v2/processing/customers/${param.customerID}/bindings`,
        accessToken: param.accessToken,
        method: 'POST',
        body: { paymentResource: param.paymentResource }
    });
}

export default createBinding;
