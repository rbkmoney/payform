import { Dispatch } from 'redux';
import { TypeKeys } from '../type-keys';
import { GetAppConfigAction } from './get-app-config-action';

export function getAppConfig(): Dispatch<GetAppConfigAction> {
    return (dispatch: Dispatch<GetAppConfigAction>) => {
        fetch('../appConfig.json', {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'GET'
        })
            .then((response) => response.json())
            .then((appConfig) => {
                dispatch({
                    type: TypeKeys.GET_APP_CONFIG,
                    payload: appConfig
                } as GetAppConfigAction);
            });
    };
}
