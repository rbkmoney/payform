import { AbstractAction, TypeKeys } from 'checkout/actions';
import { CustomerEvent } from 'checkout/backend';

export interface CustomerEventPolled extends AbstractAction<CustomerEvent[]> {
    type: TypeKeys.CUSTOMER_EVENTS_POLLED;
    payload: CustomerEvent[];
}
