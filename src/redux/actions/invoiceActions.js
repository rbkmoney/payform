import { SET_INVOICE } from '../constants/invoice';
import { SET_ERROR } from '../constants/error';

import Invoice from '../../payframe/backend-communication/Invoice';

function setError(localePath) {
    return {
        type: SET_ERROR,
        payload: {
            localePath
        }
    };
}

function dispatchInvoice(dispatch, invoice, invoiceAccessToken) {
    switch (invoice.status) {
        case 'unpaid':
            dispatch({
                type: SET_INVOICE,
                payload: {
                    invoice: invoice,
                    invoiceAccessToken: invoiceAccessToken
                }
            });
            break;
        case 'cancelled':
            dispatch(setError('error.invoice.cancelled'));
            break;
        case 'paid':
            dispatch(setError('error.invoice.paid'));
            break;
    }
}

function dispatchError(error, localePath, dispatch) {
    console.error(error);
    dispatch(setError(localePath));
}

function getInvoice(capiEndpoint, invoiceID, invoiceAccessToken) {
    return (dispatch) => {
        Invoice.getInvoice(capiEndpoint, invoiceID, invoiceAccessToken)
            .then((invoice) => dispatchInvoice(dispatch, invoice))
            .catch((error) => dispatchError(error, 'error.invoice.getInvoice', dispatch));
    };
}

function createInvoice(capiEndpoint, invoiceTemplateID, invoiceTemplateAccessToken, invoiceParams) {
    return (dispatch) => {
        Invoice.createInvoice(capiEndpoint, invoiceTemplateID, invoiceTemplateAccessToken, invoiceParams)
            .then((invoiceAndToken) => dispatchInvoice(
                dispatch,
                invoiceAndToken.invoice,
                invoiceAndToken.invoiceAccessToken
            )).catch((error) => dispatchError(error, 'error.invoice.notCreated', dispatch));
    };
}

export { getInvoice, createInvoice };
