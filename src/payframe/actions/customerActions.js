import { SET_ERROR } from '../constants/error';
import { SET_CUSTOMER } from '../constants/customer';
import getCustomerFromCapi from '../backendCommunication/getCustomer';

function setError(localePath) {
    return {
        type: SET_ERROR,
        payload: {
            localePath
        }
    };
}

function dispatchCustomer(dispatch, customer, customerAccessToken) {
    switch (customer.status) {
        case 'unready':
            dispatch({
                type: SET_CUSTOMER,
                payload: {
                    customer: customer,
                    customerAccessToken: customerAccessToken
                }
            });
            break;
        case 'ready':
            dispatch(setError('error.customer.unready'));
            break;
    }
}

function dispatchError(error, localePath, dispatch) {
    dispatch(setError(localePath));
}

/**
 * @param {Object} param
 * @param {string} param.capiEndpoint
 * @param {string} param.invoiceID
 * @param {string} param.accessToken
 */
function getCustomer(param) {
    return (dispatch) => {
        getCustomerFromCapi({
            capiEndpoint: param.capiEndpoint,
            accessToken: param.accessToken,
            customerID: param.customerID
        }).then((customer) => dispatchCustomer(dispatch, customer, param.accessToken))
            .catch((error) => dispatchError(error, 'error.invoice.getCustomer', dispatch));
    };
}

export { getCustomer };