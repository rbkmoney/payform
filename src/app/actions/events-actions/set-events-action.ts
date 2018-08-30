import { TypeKeys } from '../type-keys';
import { AbstractAction } from '..';
import { Event } from 'checkout/backend/model';

interface SetEventsInitActions extends AbstractAction<Event[]> {
    type: TypeKeys.EVENTS_INIT | TypeKeys.EVENTS_POLLING;
}

interface SetEventsResultActions extends AbstractAction {
    type: TypeKeys.EVENTS_POLLED | TypeKeys.EVENTS_POLLING_TIMEOUT;
}

export type SetEventsAction = SetEventsInitActions | SetEventsResultActions;
