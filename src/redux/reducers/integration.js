import { SET_INVOICE } from '../constants/invoice';
import { SET_INVOICE_TEMPLATE } from '../constants/invoiceTemplate';

export default function (state = null, action) {
    switch (action.type) {
        case SET_INVOICE:
            return {
                ...state,
                invoice: action.payload.invoice
            };
        case SET_INVOICE_TEMPLATE:
            return {
                ...state,
                invoiceTemplate: action.payload.invoiceTemplate
            }
    }
    return state;
}
