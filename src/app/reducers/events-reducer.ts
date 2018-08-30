import { TypeKeys } from '../actions';
import { PaymentFlowResultState } from 'checkout/state';
import { EventsAction } from 'checkout/actions/events-action';

export function eventsReducer(s: PaymentFlowResultState = null, action: EventsAction): PaymentFlowResultState {
    switch (action.type) {
        case TypeKeys.SET_PAYMENT_FLOW_RESULT: {
            return action.payload;
        }
    }
    return s;
}
