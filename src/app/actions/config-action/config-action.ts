import { Action } from 'redux';
import { TypeKeys } from '../type-keys';
import { Config } from '../../config/config';

export interface ConfigAction extends Action {
    type: TypeKeys.SET_CONFIG,
    payload: Config
}
