import { TypeKeys, ConfigChunkReceived, InitConfigChecked } from 'checkout/actions';
import { ConfigState } from 'checkout/state';

type ConfigReducerAction = ConfigChunkReceived | InitConfigChecked;

export function configReducer(s: ConfigState = null, action: ConfigReducerAction): ConfigState {
    switch (action.type) {
        case TypeKeys.CONFIG_CHUNK_RECEIVED:
            return {
                ...s,
                ...action.payload
            };
        case TypeKeys.INIT_CONFIG_CHECKED:
            return {
                ...s,
                initConfig: {
                    ...action.payload
                }
            };

    }
    return s;
}
