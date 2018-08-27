import { TypeKeys } from '../actions';
import { PaymentFlowResultState } from 'checkout/state';
import { PaymentFlowResultAction } from 'checkout/actions/payment-flow-result-action';

export function paymentFlowResultReducer(
    s: PaymentFlowResultState = null,
    action: PaymentFlowResultAction
): PaymentFlowResultState {
    switch (action.type) {
        case TypeKeys.SET_PAYMENT_FLOW_RESULT: {
            return action.payload;
        }
    }
    return s;
}
