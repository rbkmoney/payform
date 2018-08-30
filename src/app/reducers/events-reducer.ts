import { TypeKeys } from '../actions';
import { EventsState, EventsStatus } from 'checkout/state';
import { SetEventsAction } from 'checkout/actions';
import { mergeEvents } from 'checkout/utils';

export function eventsReducer(s: EventsState = {}, action: SetEventsAction): EventsState {
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
                invoiceEventsStatus: EventsStatus.polled,
                invoiceEvents: mergeEvents(s.invoiceEvents, action.payload)
            };
        case TypeKeys.EVENTS_POLLING_TIMEOUT:
            return {
                ...s,
                invoiceEventsStatus: EventsStatus.timeout
            };
    }
    return s;
}
