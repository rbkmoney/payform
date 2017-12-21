import { AbstractAction, TypeKeys } from '.';
import { LogicError } from 'checkout/backend';

export interface SetErrorAction extends AbstractAction<LogicError> {
    type: TypeKeys.SET_ERROR,
    payload: LogicError;
}
