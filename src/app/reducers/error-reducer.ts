import { SetErrorAction, AcceptError, TypeKeys } from 'checkout/actions';
import { ErrorStatus, ErrorState } from 'checkout/state';

type ErrorReducerAction = SetErrorAction | AcceptError;

export function errorReducer(s: ErrorState = null, action: ErrorReducerAction): ErrorState {
    switch (action.type) {
        case TypeKeys.SET_ERROR:
            console.error(action.payload);
            return {
                status: ErrorStatus.unhandled,
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
