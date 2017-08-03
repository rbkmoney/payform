import { GET_INVOICE } from '../constants/invoice';

import Invoice from '../../payframe/backend-communication/Invoice';

export function getInvoice(capiEndpoint, invoiceID, invoiceAccessToken, locale) {
    return (dispatch) => {
        Invoice.getInvoice(capiEndpoint, invoiceID, invoiceAccessToken, locale)
            .then((response) => {
                dispatch({
                    type: GET_INVOICE,
                    payload: response
                });
            });
    }
}