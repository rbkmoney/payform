import { GET_INVOICE, CREATE_INVOICE } from '../constants/invoice';

import Invoice from '../../payframe/backend-communication/Invoice';

export function getInvoice(capiEndpoint, invoiceID, invoiceAccessToken, locale) {
    return (dispatch) => {
        Invoice.getInvoice(capiEndpoint, invoiceID, invoiceAccessToken, locale)
            .then((response) => {
                dispatch({
                    type: GET_INVOICE,
                    payload: {
                        invoice: response,
                        invoiceAccessToken: {
                            payload: invoiceAccessToken
                        }
                    }
                });
            });
    }
}

export function createInvoice(template, params, locale) {
    return (dispatch) => {
        Invoice.createInvoice(params, template, locale).then((response) => {
            dispatch({
                type: CREATE_INVOICE,
                payload: response
            });
        });
    }
}