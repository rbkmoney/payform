import { ModelState } from 'checkout/state';
import { TypeKeys, InitializeModelCompleted, InvoiceCreated, EventPolled, CustomerEventPolled } from 'checkout/actions';
import { mergeEvents } from 'checkout/utils';
import { CustomerEvent, Event } from 'checkout/backend';

type ModelReducerAction = InitializeModelCompleted | InvoiceCreated | EventPolled | CustomerEventPolled;

export function modelReducer(s: ModelState = null, action: ModelReducerAction): ModelState {
    switch (action.type) {
        case TypeKeys.INITIALIZE_MODEL_COMPLETED:
            return {
                ...s,
                ...action.payload
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
