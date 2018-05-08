import { AbstractAction, TypeKeys } from 'checkout/actions';
import { Event } from 'checkout/backend';

export interface EventPolled extends AbstractAction<Event[]> {
    type: TypeKeys.EVENTS_POLLED;
    payload: Event[];
}
