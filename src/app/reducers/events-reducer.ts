import { SetCustomerEventsAction, TypeKeys } from '../actions';
import { EventsState, EventsStatus } from 'checkout/state';
import { SetEventsAction } from 'checkout/actions';
import { mergeEvents } from 'checkout/utils';

function invoiceEventsReducer(s: EventsState, action: SetEventsAction): EventsState {
    switch (action.type) {
        case TypeKeys.EVENTS_INIT:
            return {
                ...s,
                invoiceEventsStatus: EventsStatus.init,
                invoiceEvents: action.payload
            };
        case TypeKeys.EVENTS_POLLED:
            return {
                ...s,
                invoiceEventsStatus: EventsStatus.polled
            };
        case TypeKeys.EVENTS_POLLING:
            return {
                ...s,
                invoiceEventsStatus: EventsStatus.polling,
                invoiceEvents: mergeEvents(s.invoiceEvents, action.payload)
            };
        case TypeKeys.EVENTS_POLLING_TIMEOUT:
            return {
                ...s,
                invoiceEventsStatus: EventsStatus.timeout
            };
    }
}

function customerEventsReducer(s: EventsState, action: SetCustomerEventsAction): EventsState {
    switch (action.type) {
        case TypeKeys.CUSTOMER_EVENTS_INIT:
            return {
                ...s,
                customerEventsStatus: EventsStatus.init,
                customerEvents: action.payload
            };
        case TypeKeys.CUSTOMER_EVENTS_POLLED:
            return {
                ...s,
                customerEventsStatus: EventsStatus.polled
            };
        case TypeKeys.CUSTOMER_EVENTS_POLLING:
            return {
                ...s,
                customerEventsStatus: EventsStatus.polling,
                customerEvents: mergeEvents(s.customerEvents, action.payload)
            };
        case TypeKeys.CUSTOMER_EVENTS_POLLING_TIMEOUT:
            return {
                ...s,
                customerEventsStatus: EventsStatus.timeout
            };
    }
}

export const eventsReducer = (s: EventsState = {}, action: SetEventsAction | SetCustomerEventsAction): EventsState =>
    invoiceEventsReducer(s, action as SetEventsAction) ||
    customerEventsReducer(s, action as SetCustomerEventsAction) ||
    s;
