import { AbstractAction } from '../abstract-action';
import { TypeKeys } from '../type-keys';
import { LogicError } from 'checkout/backend';

export interface SetAcceptedError extends AbstractAction<LogicError> {
    type: TypeKeys.SET_ACCEPTED_ERROR;
}
