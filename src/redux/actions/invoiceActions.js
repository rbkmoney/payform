import { SET_INVOICE } from '../constants/invoice';
import { SET_ERROR } from '../constants/error';
import getInvoiceFromCapi from '../../payframe/backend-communication/getInvoice';
import createInvoiceWithTemplateFromCapi from '../../payframe/backend-communication/createInvoiceWithTemplate';

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

/**
 * @param {Object} param
 * @param {string} param.capiEndpoint
 * @param {string} param.invoiceID
 * @param {string} param.accessToken
 */
function getInvoice(param) {
    return (dispatch) => {
        getInvoiceFromCapi({
            capiEndpoint: param.capiEndpoint,
            accessToken: param.accessToken,
            invoiceID: param.invoiceID
        }).then((invoice) => dispatchInvoice(dispatch, invoice, param.accessToken))
            .catch((error) => dispatchError(error, 'error.invoice.getInvoice', dispatch));
    };
}

/**
 * @param {Object} param
 * @param {string} param.capiEndpoint
 * @param {string} param.accessToken
 * @param {string} param.invoiceTemplateID
 * @param {InvoiceParamsWithTemplate} param.invoiceParamsWithTemplate
 */
function createInvoiceWithTemplate(param) {
    return (dispatch) => {
        createInvoiceWithTemplateFromCapi({
            capiEndpoint: param.capiEndpoint,
            accessToken: param.accessToken,
            invoiceTemplateID: param.invoiceTemplateID,
            invoiceParamsWithTemplate: param.invoiceParamsWithTemplate
        }).then((invoiceAndToken) => dispatchInvoice(
            dispatch,
            invoiceAndToken.invoice,
            invoiceAndToken.invoiceAccessToken.payload
        )).catch((error) => dispatchError(error, 'error.invoice.notCreated', dispatch));
    };
}

export { getInvoice, createInvoiceWithTemplate };
