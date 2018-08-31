import { TypeKeys } from '../type-keys';
import { AbstractAction } from '..';
import { CustomerEvent, InvoiceEvent } from 'checkout/backend/model';

interface SetEventsInitActions extends AbstractAction<InvoiceEvent[] | CustomerEvent[]> {
    type: TypeKeys.EVENTS_INIT | TypeKeys.EVENTS_POLLING;
}

interface SetEventsResultActions extends AbstractAction {
    type: TypeKeys.EVENTS_POLLED | TypeKeys.EVENTS_POLLING_TIMEOUT;
}

export type SetEventsAction = SetEventsInitActions | SetEventsResultActions;
