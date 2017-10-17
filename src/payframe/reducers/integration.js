import { SET_INVOICE } from '../constants/invoice';
import { SET_INVOICE_TEMPLATE } from '../constants/invoiceTemplate';
import { SET_CUSTOMER } from '../constants/customer';

export default function (state = null, action) {
    switch (action.type) {
        case SET_INVOICE:
            return {
                ...state,
                invoice: action.payload.invoice,
                invoiceAccessToken: action.payload.invoiceAccessToken
            };
        case SET_INVOICE_TEMPLATE:
            return {
                ...state,
                invoiceTemplate: action.payload.invoiceTemplate
            };
        case SET_CUSTOMER:
            return {
                ...state,
                customer: action.payload.customer,
                customerAccessToken: action.payload.customerAccessToken
            };
    }
    return state;
}
