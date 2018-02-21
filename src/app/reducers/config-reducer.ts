import { TypeKeys, SetConfigChunk, SetCheckedInitConfig } from 'checkout/actions';
import { ConfigState } from 'checkout/state';

type ConfigReducerAction = SetConfigChunk | SetCheckedInitConfig;

export function configReducer(s: ConfigState = null, action: ConfigReducerAction): ConfigState {
    switch (action.type) {
        case TypeKeys.SET_CONFIG_CHUNK:
            return {
                ...s,
                ...action.payload,
                ready: true
            };
        case TypeKeys.SET_CHECKED_INIT_CONFIG:
            return {
                ...s,
                initConfig: {
                    ...action.payload,
                    checked: true
                }
            };

    }
    return s;
}
