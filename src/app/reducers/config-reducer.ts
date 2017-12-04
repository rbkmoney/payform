import { TypeKeys, GetAppConfigAction, GetLocaleAction } from 'checkout/actions';
import { ConfigState } from 'checkout/state';

type ConfigReducerAction = GetAppConfigAction | GetLocaleAction;

export function configReducer(s: ConfigState = null, action: ConfigReducerAction): ConfigState {
    switch (action.type) {
        case TypeKeys.GET_APP_CONFIG:
            return {
                ...s,
                appConfig: action.payload
            };
        case TypeKeys.GET_LOCALE:
            return {
                ...s,
                locale: action.payload
            };

    }
    return s;
}
