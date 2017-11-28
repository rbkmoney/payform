import { Action } from 'redux';
import { TypeKeys } from '../type-keys';
import { AppConfig } from '../../config';

export interface GetAppConfigAction extends Action {
    type: TypeKeys.GET_APP_CONFIG,
    payload: AppConfig
}
