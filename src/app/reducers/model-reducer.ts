import { ModelState, ModelStatus } from 'checkout/state';
import {
    TypeKeys,
    PayAction,
    Accept,
    PollInvoiceEvents,
    Initialize,
    Subscribe, PollCustomerEvents
} from 'checkout/actions';
import { mergeEvents } from 'checkout/utils';
import { CustomerEvent, Event } from 'checkout/backend';

type ModelReducerAction =
    PayAction |
    Accept |
    PollInvoiceEvents |
    PollCustomerEvents |
    Initialize |
    Subscribe;

const initialState = {
    status: ModelStatus.none
};

export function modelReducer(s: ModelState = initialState, action: ModelReducerAction): ModelState {
    switch (action.type) {
        case TypeKeys.INIT_MODEL:
            return {
                ...s,
                ...action.payload,
                status: ModelStatus.initialized
            };
        case TypeKeys.PAY:
            return {
                ...s,
                invoiceEvents: mergeEvents(s.invoiceEvents, action.payload.invoiceEvents) as Event[],
                invoiceAccessToken: action.payload.invoiceAccessToken,
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
    }
    return s;
}
