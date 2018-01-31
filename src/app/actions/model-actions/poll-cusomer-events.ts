import { Dispatch } from 'redux';
import { AbstractAction, SetErrorAction, TypeKeys } from 'checkout/actions';
import { CustomerEvent } from 'checkout/backend';
import { pollCustomerEvents as pollCustomerEventsOperation } from './operations';

export interface PollCustomerEvents extends AbstractAction<CustomerEvent[]> {
    type: TypeKeys.POLL_CUSTOMER_EVENTS;
    payload: CustomerEvent[];
}

export type PollCustomerEventsDispatch = (dispatch: Dispatch<PollCustomerEvents | SetErrorAction>) => void;

export const pollCustomerEvents = (capiEndpoint: string, accessToken: string, customerID: string, events: CustomerEvent[]): PollCustomerEventsDispatch =>
    (dispatch) => pollCustomerEventsOperation(capiEndpoint, accessToken, customerID, events)
        .then((customerEvents) => dispatch({
            type: TypeKeys.POLL_CUSTOMER_EVENTS,
            payload: customerEvents
        }))
        .catch((error) => dispatch({
            type: TypeKeys.SET_ERROR,
            payload: error
        }));
