import { SetErrorAction, AcceptError, TypeKeys, InitializeAppFailed } from 'checkout/actions';
import { ErrorStatus, ErrorState } from 'checkout/state';

type ErrorReducerAction = SetErrorAction | AcceptError | InitializeAppFailed;

export function errorReducer(s: ErrorState = null, action: ErrorReducerAction): ErrorState {
    switch (action.type) {
        case TypeKeys.SET_ERROR:
        case TypeKeys.INITIALIZE_APP_FAILED:
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
