import { TypeKeys, GetAppConfigAction } from '../actions';
import { ConfigState } from '../state/config-state';

export function configReducer(s: ConfigState = null, action: GetAppConfigAction): ConfigState {
    switch (action.type) {
        case TypeKeys.GET_APP_CONFIG:
            return {
                ...s,
                appConfig: action.payload
            };

    }
    return s;
}
