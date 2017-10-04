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
    switch (customer.status.status) {
        case 'ready':
            dispatch({
                type: SET_CUSTOMER,
                payload: {
                    customer: customer,
                    customerAccessToken: customerAccessToken
                }
            });
            break;
        case 'unready':
            dispatch(setError('error.customer.unready'));
            break;
    }
}

function dispatchError(error, localePath, dispatch) {
    console.error(error);
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
            customerID: param.invoiceID
        }).then((customer) => dispatchCustomer(dispatch, customer, param.accessToken))
            .catch((error) => dispatchError(error, 'error.invoice.getCustomer', dispatch));
    };
}

export { getCustomer };