import { TypeKeys, GetAppConfigAction } from 'checkout/actions';
import { ConfigState } from 'checkout/state';

type ConfigReducerAction = GetAppConfigAction;

export function configReducer(s: ConfigState = null, action: ConfigReducerAction): ConfigState {
    switch (action.type) {
        case TypeKeys.GET_APP_CONFIG:
            return {
                ...s,
                appConfig: action.payload
            };

    }
    return s;
}
