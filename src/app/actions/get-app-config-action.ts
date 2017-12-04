import { Dispatch } from 'redux';
import { TypeKeys } from './type-keys';
import { AppConfig, getAppConfig } from 'checkout/backend';
import { SetErrorAction, AbstractAction } from '.';

export interface GetAppConfigAction extends AbstractAction<AppConfig> {
    type: TypeKeys.GET_APP_CONFIG;
    payload: AppConfig;
}

export type GetAppConfigDispatch = (dispatch: Dispatch<GetAppConfigAction | SetErrorAction>) => void;

export const getAppConfigAction = (): GetAppConfigDispatch =>
    (dispatch) => getAppConfig()
        .then((appConfig) => dispatch({
            type: TypeKeys.GET_APP_CONFIG,
            payload: appConfig
        }))
        .catch((error) => dispatch({
            type: TypeKeys.SET_ERROR,
            payload: {
                message: 'Failed to load app config'
            }
        }));
