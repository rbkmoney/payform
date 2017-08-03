import { GET_INVOICE_TEMPLATE } from '../constants/invoiceTemplate';

import InvoiceTemplate from '../../payframe/backend-communication/InvoiceTemplate';

export function getInvoiceTemplate(capiEndpoint, invoiceTemplateID, invoiceTemplateAccessToken, locale) {
    return (dispatch) => {
        InvoiceTemplate.getInvoiceTemplate(capiEndpoint, invoiceTemplateID, invoiceTemplateAccessToken, locale)
            .then((response) => {
                dispatch({
                    type: GET_INVOICE_TEMPLATE,
                    payload: response
                });
            });
    }
}