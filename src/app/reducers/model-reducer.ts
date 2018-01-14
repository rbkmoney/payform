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
    SetModel,
    PayAction,
    ProcessAction,
    PollInvoiceEvents
} from 'checkout/actions';
import { Event } from 'checkout/backend';

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
    SetModel |
    PayAction |
    ProcessAction |
    PollInvoiceEvents;

const initialState = {
    invoiceTemplate: null,
    invoice: null,
    invoiceAccessToken: null,
    paymentMethods: null,
    invoiceEvents: null
} as ModelState;

const mergeEvents = (stateEvents: Event[], actionEvents: Event[]) => {
    const first = actionEvents[0];
    const sliced = stateEvents ? stateEvents.slice(0, first ? first.id : undefined) : [];
    return sliced.concat(actionEvents);
};

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
        case TypeKeys.PAY:
            return {
                ...s,
                invoiceEvents: mergeEvents(s.invoiceEvents, action.payload.invoiceEvents),
                invoiceAccessToken: action.payload.invoiceAccessToken,
                processed: false

            };
        case TypeKeys.POLL_EVENTS:
            return {
                ...s,
                invoiceEvents: mergeEvents(s.invoiceEvents, action.payload),
                processed: false
            };
        case TypeKeys.PROCESS_MODEL:
            return {
                ...s,
                processed: action.payload
            };
    }
    return s;
}
