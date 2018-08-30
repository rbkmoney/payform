import { TypeKeys } from '../actions';
import { EventsState } from 'checkout/state';
import { EventsAction } from 'checkout/actions/events-action';

export function eventsReducer(s: EventsState = null, action: EventsAction): EventsState {
    switch (action.type) {
        case TypeKeys.SET_PAYMENT_FLOW_RESULT: {
            return action.payload;
        }
    }
    return s;
}
