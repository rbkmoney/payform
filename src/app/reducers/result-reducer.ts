import { State } from '../state/state';
import { TypeKeys } from '../actions/type-keys';
import { ResultAction } from '../actions/result-action/result-action';

export function resultReducer(s: State = null, action: ResultAction) {
    switch (action.type) {
        case TypeKeys.SET_RESULT: {
            return action.payload;
        }
        default:
            return s;
    }
}
