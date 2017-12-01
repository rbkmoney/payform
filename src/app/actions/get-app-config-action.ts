import { Dispatch } from 'redux';
import { TypeKeys } from './type-keys';
import { AbstractAction } from './abstract-action';
import { AppConfig, getAppConfig } from 'checkout/backend';

export interface GetAppConfigAction extends AbstractAction<AppConfig> {
    type: TypeKeys.GET_APP_CONFIG;
    payload: AppConfig;
}

export type GetAppConfigDispatch = (dispatch: Dispatch<GetAppConfigAction>) => void;

export function getAppConfigAction(): GetAppConfigDispatch {
    return (dispatch) => {
        getAppConfig().then((appConfig) => {
            dispatch({
                type: TypeKeys.GET_APP_CONFIG,
                payload: appConfig
            });
        });
    };
}
