import { TypeKeys } from './type-keys';
import { EventsState } from '../state';
import { AbstractAction } from './abstract-action';

export interface EventsAction extends AbstractAction<EventsState> {
    type: TypeKeys.SET_PAYMENT_FLOW_RESULT;
    payload: EventsState;
}
