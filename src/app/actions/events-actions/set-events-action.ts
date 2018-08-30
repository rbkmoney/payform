import { TypeKeys } from '../type-keys';
import { AbstractAction } from '..';
import { Event } from 'checkout/backend/model';

interface SetEventsInitAction extends AbstractAction<Event[]> {
    type: TypeKeys.EVENTS_INIT;
}

interface SetEventsPolledAction extends AbstractAction<Event[]> {
    type: TypeKeys.EVENTS_POLLED;
}

interface SetEventsTimeoutAction extends AbstractAction {
    type: TypeKeys.EVENTS_POLLING_TIMEOUT;
}

export type SetEventsAction = SetEventsPolledAction | SetEventsTimeoutAction | SetEventsInitAction;
