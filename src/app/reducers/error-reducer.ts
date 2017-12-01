import { SetErrorAction, TypeKeys } from 'checkout/actions';
import { ErrorState } from 'checkout/state';

type ErrorReducerAction = SetErrorAction;

export function errorReducer(s: ErrorState = null, action: ErrorReducerAction): ErrorState {
    switch (action.type) {
        case TypeKeys.SET_ERROR:
            return action.payload;
    }
    return s;
}
