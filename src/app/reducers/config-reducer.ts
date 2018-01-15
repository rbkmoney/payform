import { TypeKeys, SetConfigChunk } from 'checkout/actions';
import { ConfigState } from 'checkout/state';

type ConfigReducerAction = SetConfigChunk;

export function configReducer(s: ConfigState = null, action: ConfigReducerAction): ConfigState {
    switch (action.type) {
        case TypeKeys.SET_CONFIG_CHUNK:
            return {
                ...s,
                ...action.payload,
                ready: true
            };

    }
    return s;
}
