import { AbstractAction, TypeKeys } from '../index';
import { LogicError } from 'checkout/backend';

export interface SetErrorAction extends AbstractAction<LogicError> {
    type: TypeKeys.SET_ERROR;
    payload: LogicError;
}
