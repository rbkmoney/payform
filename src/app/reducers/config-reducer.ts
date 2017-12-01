import { ConfigAction, TypeKeys } from '../actions';
import { ConfigState } from 'checkout/state';

export function configReducer(s: ConfigState = null, action: ConfigAction): ConfigState {
    console.log(action.payload);
    switch (action.type) {
        case TypeKeys.SET_CONFIG:
            return action.payload;

    }
    return s;
}
