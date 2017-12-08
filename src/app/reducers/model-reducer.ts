import { ModelState } from 'checkout/state';
import {
    TypeKeys,
    GetInvoiceTemplateAction,
    GetInvoiceAction,
    GetInvoicePaymentMethodsAction,
    GetInvoicePaymentMethodsByTemplateIdAction,
    GetInvoiceEvents,
    SetInvoice
} from 'checkout/actions';

type ModelReducerAction =
    GetInvoiceTemplateAction |
    GetInvoiceAction |
    SetInvoice |
    GetInvoicePaymentMethodsAction |
    GetInvoicePaymentMethodsByTemplateIdAction |
    GetInvoiceEvents;

const initialState = {
    invoiceTemplate: null,
    invoice: null,
    paymentMethods: null,
    invoiceEvents: null
} as ModelState;

export function modelReducer(s: ModelState = initialState, action: ModelReducerAction): ModelState {
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
        case TypeKeys.SET_INVOICE:
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
        case TypeKeys.GET_INVOICE_EVENTS:
            return {
                ...s,
                invoiceEvents: action.payload as any // TODO fix it
            };
    }
    return s;
}
