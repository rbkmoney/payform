import { TypeKeys, ConfigChunkReceived, InitConfigChecked } from 'checkout/actions';
import { ConfigState } from 'checkout/state';
import { DEFAULT_THEME, themes } from 'checkout/themes';

type ConfigReducerAction = ConfigChunkReceived | InitConfigChecked;

export function configReducer(s: ConfigState = null, action: ConfigReducerAction): ConfigState {
    switch (action.type) {
        case TypeKeys.CONFIG_CHUNK_RECEIVED:
            if (action.payload.appConfig) {
                return {
                    ...s,
                    ...action.payload,
                    theme: (themes as any)[action.payload.appConfig.fixedTheme] || DEFAULT_THEME
                };
            }
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
