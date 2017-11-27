import { TypeKeys, ResultAction } from '../actions';
import { ResultState } from '../state/result-state';

export function resultReducer(s: ResultState = null, action: ResultAction): ResultState {
    switch (action.type) {
        case TypeKeys.SET_RESULT: {
            return action.payload;
        }
    }
    return s;
}
