import {
    SetErrorAction,
    AcceptError,
    TypeKeys,
    InitializeAppFailed,
    PaymentFailed,
    SubscriptionFailed,
    FinishInteractionFailed
} from 'checkout/actions';
import { ErrorStatus, ErrorState } from 'checkout/state';
import { SetAcceptedError } from 'checkout/actions/error-actions/set-accepted-error';

type ErrorReducerAction =
    | SetErrorAction
    | AcceptError
    | InitializeAppFailed
    | PaymentFailed
    | SubscriptionFailed
    | FinishInteractionFailed
    | SetAcceptedError;

export function errorReducer(s: ErrorState = null, action: ErrorReducerAction): ErrorState {
    switch (action.type) {
        case TypeKeys.SET_ERROR:
        case TypeKeys.INITIALIZE_APP_FAILED:
        case TypeKeys.PAYMENT_FAILED:
        case TypeKeys.SUBSCRIPTION_FAILED:
        case TypeKeys.FINISH_INTERACTION_FAILED:
            console.error(action.payload);
            return {
                status: ErrorStatus.unhandled,
                error: action.payload
            };
        case TypeKeys.SET_ACCEPTED_ERROR:
            console.info(action.payload);
            return {
                status: ErrorStatus.accepted,
                error: action.payload
            };
        case TypeKeys.ACCEPT_ERROR:
            return {
                ...s,
                status: ErrorStatus.accepted
            };
    }
    return s;
}
