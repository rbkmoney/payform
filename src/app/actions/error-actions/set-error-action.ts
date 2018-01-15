import { AbstractAction, TypeKeys } from '../index';
import { LogicError } from 'src/app/backend/index';

export interface SetErrorAction extends AbstractAction<LogicError> {
    type: TypeKeys.SET_ERROR,
    payload: LogicError;
}
