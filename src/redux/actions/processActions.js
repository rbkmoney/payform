import { CREATE_PAYMENT, FAILED_PAYMENT } from '../constants/process';
import { CREATE_INVOICE, FAILED_CREATE_INVOICE } from '../constants/invoice';
import Processing from '../../payframe/backend-communication/Processing';
import Invoice from '../../payframe/backend-communication/Invoice';

export function process(params, locale, template) {
    return (dispatch) => {
        if (params.invoiceID) {
            Processing.process(params, locale).then((response) => {
                dispatch({
                    type: CREATE_PAYMENT,
                    payload: response
                });
            }).catch((error) => {
                dispatch({
                    type: FAILED_PAYMENT,
                    payload: error
                });
            });
        } else if (params.invoiceTemplate) {
            Invoice.createInvoice(params, template, locale).then((response) => {
                dispatch({
                    type: CREATE_INVOICE,
                    payload: response
                });
            }).catch((error) => {
                dispatch({
                    type: FAILED_CREATE_INVOICE,
                    payload: error
                })
            });
        }
    }
}