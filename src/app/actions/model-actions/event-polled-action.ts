import { AbstractAction, TypeKeys } from 'checkout/actions';
import { Event } from 'checkout/backend';

export interface EventPolled extends AbstractAction<Event[]> {
    type: TypeKeys.EVENT_POLLED;
    payload: Event[];
}
