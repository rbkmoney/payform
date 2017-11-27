import { ConfigAction, TypeKeys } from '../actions';
import { ConfigState } from '../state/config-state';

export function configReducer(s: ConfigState = null, action: ConfigAction): ConfigState {
    switch (action.type) {
        case TypeKeys.SET_CONFIG:
            return action.payload;

    }
    return s;
}
