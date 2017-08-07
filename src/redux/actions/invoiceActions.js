import { SET_INVOICE, CREATE_INVOICE } from '../constants/invoice';
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

function getInvoice(capiEndpoint, invoiceID, invoiceAccessToken) {
    return (dispatch) => {
        Invoice.getInvoice(capiEndpoint, invoiceID, invoiceAccessToken).then((invoice) => {
            switch (invoice.status) {
                case 'unpaid':
                    dispatch({
                        type: SET_INVOICE,
                        payload: {
                            invoice: invoice
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
        }).catch(() => dispatch(setError('error.invoice.getInvoice')));
    };
}

function createInvoice(template, params, locale) {
    return (dispatch) => {
        Invoice.createInvoice(params, template, locale).then((response) => {
            dispatch({
                type: CREATE_INVOICE,
                payload: response
            });
        });
    };
}

export { getInvoice, createInvoice };