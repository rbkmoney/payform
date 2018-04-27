import { ModelState, ModelStatus } from 'checkout/state';
import {
    TypeKeys,
    PayAction,
    Accept,
    PollInvoiceEvents,
    InitializeModelCompleted,
    Subscribe,
    PollCustomerEvents,
    InvoiceCreated,
    EventPolled,
    CustomerEventPolled
} from 'checkout/actions';
import { mergeEvents } from 'checkout/utils';
import { CustomerEvent, Event } from 'checkout/backend';

type ModelReducerAction =
    PayAction |
    Accept |
    PollInvoiceEvents |
    PollCustomerEvents |
    InitializeModelCompleted |
    Subscribe |
    InvoiceCreated |
    EventPolled |
    CustomerEventPolled;

const initialState = {
    status: ModelStatus.none
};

export function modelReducer(s: ModelState = initialState, action: ModelReducerAction): ModelState {
    switch (action.type) {
        case TypeKeys.INITIALIZE_MODEL_COMPLETED:
            return {
                ...s,
                ...action.payload,
                status: ModelStatus.initialized
            };
        case TypeKeys.PAY:
            return {
                ...s,
                invoiceEvents: mergeEvents(s.invoiceEvents, action.payload.invoiceEvents) as Event[],
                invoiceAccessToken: action.payload.invoiceAccessToken, // TODO remove after saga migration
                status: ModelStatus.refreshed

            };
        case TypeKeys.SUBSCRIBE:
            return {
                ...s,
                customerEvents: mergeEvents(s.customerEvents, action.payload) as CustomerEvent[],
                status: ModelStatus.refreshed
            };
        case TypeKeys.POLL_EVENTS:
            return {
                ...s,
                invoiceEvents: mergeEvents(s.invoiceEvents, action.payload) as Event[],
                status: ModelStatus.refreshed
            };
        case TypeKeys.POLL_CUSTOMER_EVENTS:
            return {
                ...s,
                customerEvents: mergeEvents(s.customerEvents, action.payload) as CustomerEvent[],
                status: ModelStatus.refreshed
            };
        case TypeKeys.ACCEPT_MODEL:
            return {
                ...s,
                status: ModelStatus.accepted
            };
        case TypeKeys.INVOICE_CREATED:
            return {
                ...s,
                invoice: action.payload.invoice,
                invoiceAccessToken: action.payload.invoiceAccessToken,
                invoiceEvents: null
            };
        case TypeKeys.EVENTS_POLLED:
            return {
                ...s,
                invoiceEvents: mergeEvents(s.invoiceEvents, action.payload) as Event[]
            };
        case TypeKeys.CUSTOMER_EVENTS_POLLED:
            return {
                ...s,
                customerEvents: mergeEvents(s.customerEvents, action.payload) as CustomerEvent[]
            };
    }
    return s;
}
