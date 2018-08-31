import { TypeKeys } from '../actions';
import { EventsState, EventsStatus } from 'checkout/state';
import { SetEventsAction } from 'checkout/actions';
import { mergeEvents } from 'checkout/utils';
import { Event } from 'checkout/backend';

export function eventsReducer(s: EventsState, action: SetEventsAction): EventsState {
    switch (action.type) {
        case TypeKeys.EVENTS_INIT:
            return {
                ...s,
                status: EventsStatus.init,
                events: action.payload
            };
        case TypeKeys.EVENTS_POLLED:
            return {
                ...s,
                status: EventsStatus.polled
            };
        case TypeKeys.EVENTS_POLLING:
            return {
                ...s,
                status: EventsStatus.polling,
                events: mergeEvents(s.events as Event[], action.payload as Event[])
            };
        case TypeKeys.EVENTS_POLLING_TIMEOUT:
            return {
                ...s,
                status: EventsStatus.timeout
            };
    }
    return s;
}
