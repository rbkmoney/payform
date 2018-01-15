import { AbstractAction } from '../abstract-action';
import { TypeKeys } from '../type-keys';

export interface AcceptError extends AbstractAction {
    type: TypeKeys.ACCEPT_ERROR;
}

export const acceptError = (): AcceptError => ({
    type: TypeKeys.ACCEPT_ERROR
});
