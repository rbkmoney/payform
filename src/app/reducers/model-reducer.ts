import { ModelState } from 'checkout/state';
import {
    TypeKeys,
    GetInvoiceTemplateAction,
    GetInvoiceAction,
    GetInvoicePaymentMethodsAction,
    GetInvoicePaymentMethodsByTemplateIdAction
} from 'checkout/actions';

type ModelReducerAction =
    GetInvoiceTemplateAction |
    GetInvoiceAction |
    GetInvoicePaymentMethodsAction |
    GetInvoicePaymentMethodsByTemplateIdAction;

export function modelReducer(s: ModelState = null, action: ModelReducerAction): ModelState {
    switch (action.type) {
        case TypeKeys.GET_INVOICE_TEMPLATE:
            return {
                ...s,
                invoiceTemplate: action.payload
            };
        case TypeKeys.GET_INVOICE:
            return {
                ...s,
                invoice: action.payload
            };
        case TypeKeys.GET_INVOICE_PAYMENT_METHODS:
            return {
                ...s,
                paymentMethods: action.payload
            };
        case TypeKeys.GET_INVOICE_PAYMENT_METHODS_BY_TEMPLATE_ID:
            return {
                ...s,
                paymentMethods: action.payload
            };
    }
    return s;
}
