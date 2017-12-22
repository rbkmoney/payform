import { SetErrorAction, SetErrorStatus, TypeKeys } from 'checkout/actions';
import { ErrorHandleStatus, ErrorState } from 'checkout/state';

type ErrorReducerAction = SetErrorAction | SetErrorStatus;

export function errorReducer(s: ErrorState = null, action: ErrorReducerAction): ErrorState {
    switch (action.type) {
        case TypeKeys.SET_ERROR:
            console.error(action.payload);
            return {
                status: ErrorHandleStatus.unhandled,
                error: action.payload
            };
        case TypeKeys.SET_ERROR_STATUS:
            return {
                ...s,
                status: action.payload
            };
    }
    return s;
}
