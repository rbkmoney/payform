import { SET_INVOICE_TEMPLATE } from '../constants/invoiceTemplate';

import InvoiceTemplate from '../../payframe/backend-communication/InvoiceTemplate';
import { SET_ERROR } from '../constants/error';

function setError(localePath) {
    return {
        type: SET_ERROR,
        payload: {
            localePath
        }
    };
}

function getInvoiceTemplate(capiEndpoint, invoiceTemplateID, invoiceTemplateAccessToken) {
    return (dispatch) => {
        InvoiceTemplate.getInvoiceTemplate(capiEndpoint, invoiceTemplateID, invoiceTemplateAccessToken).then((response) => {
            dispatch({
                type: SET_INVOICE_TEMPLATE,
                payload: {
                    invoiceTemplate: response
                }
            });
        }).catch((error) => {
            console.error(error);
            dispatch(setError('error.invoice.getTemplate'));
        });
    };
}

export { getInvoiceTemplate };