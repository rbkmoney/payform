import { ModelState } from 'checkout/state';
import {
    TypeKeys,
    GetInvoiceTemplateAction,
    GetInvoiceAction,
    GetInvoicePaymentMethodsAction,
    GetInvoicePaymentMethodsByTemplateIdAction,
    GetInvoiceEvents,
    SetInvoice,
    CreateInvoiceWithTemplate,
    CreatePaymentResource,
    CreatePayment,
    SetInvoiceAccessToken,
    SetModel
} from 'checkout/actions';

type ModelReducerAction =
    GetInvoiceTemplateAction |
    GetInvoiceAction |
    SetInvoice |
    GetInvoicePaymentMethodsAction |
    GetInvoicePaymentMethodsByTemplateIdAction |
    GetInvoiceEvents |
    CreateInvoiceWithTemplate |
    CreatePaymentResource |
    CreatePayment |
    SetInvoiceAccessToken |
    SetModel;

const initialState = {
    invoiceTemplate: null,
    invoice: null,
    invoiceAccessToken: null,
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
                invoiceEvents: action.payload
            };
        case TypeKeys.CREATE_INVOICE_WITH_TEMPLATE:
            return {
                ...s,
                invoice: action.payload.invoice,
                invoiceAccessToken: action.payload.invoiceAccessToken.payload
            };
        case TypeKeys.CREATE_PAYMENT_RESOURCE:
            return {
                ...s,
                paymentResource: action.payload
            };
        case TypeKeys.CREATE_PAYMENT:
            return {
                ...s,
                payment: action.payload
            };
        case TypeKeys.SET_INVOICE_ACCESS_TOKEN:
            return {
                ...s,
                invoiceAccessToken: action.payload
            };
        case TypeKeys.SET_MODEL:
            return action.payload;
    }
    return s;
}
