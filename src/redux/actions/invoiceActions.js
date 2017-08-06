import { GET_INVOICE, CREATE_INVOICE } from '../constants/invoice';
import { SET_ERROR } from '../constants/error';

import Invoice from '../../payframe/backend-communication/Invoice';

export function getInvoice(capiEndpoint, invoiceID, invoiceAccessToken) {
    return (dispatch) => {
        Invoice.getInvoice(capiEndpoint, invoiceID, invoiceAccessToken).then((invoice) => {
            dispatch({
                type: GET_INVOICE,
                payload: {
                    invoice: invoice
                }
            });
        }).catch((error) => {
            dispatch({
                type: SET_ERROR,
                payload: {
                    localePath: error.localePath
                }
            });
        });
    };
}

export function createInvoice(template, params, locale) {
    return (dispatch) => {
        Invoice.createInvoice(params, template, locale).then((response) => {
            dispatch({
                type: CREATE_INVOICE,
                payload: response
            });
        });
    };
}