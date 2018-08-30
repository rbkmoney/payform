import { TypeKeys } from '../type-keys';
import { AbstractAction } from '..';
import { CustomerEvent } from 'checkout/backend/model';

interface SetCustomerEventsInitActions extends AbstractAction<CustomerEvent[]> {
    type: TypeKeys.CUSTOMER_EVENTS_INIT | TypeKeys.CUSTOMER_EVENTS_POLLING;
}

interface SetCustomerEventsResultActions extends AbstractAction {
    type: TypeKeys.CUSTOMER_EVENTS_POLLED | TypeKeys.CUSTOMER_EVENTS_POLLING_TIMEOUT;
}

export type SetCustomerEventsAction = SetCustomerEventsInitActions | SetCustomerEventsResultActions;
