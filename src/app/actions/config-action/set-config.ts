import { Dispatch } from 'redux';
import { TypeKeys } from '../type-keys';
import { ConfigAction } from './config-action';
import { Transport } from '../../../communication-ts';
import { ConfigResolver } from '../../config/config-resolver';

export function setConfig(transport: Transport): Dispatch<ConfigAction> {
    return (dispatch: Dispatch<ConfigAction>) => {
        ConfigResolver.resolve(transport).then((config) => {
            dispatch({
                type: TypeKeys.SET_CONFIG,
                payload: config
            } as ConfigAction);
        }).catch((error) => {
            throw new Error(error);
        });
    };
}
