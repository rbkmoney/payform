import { AbstractAction } from './abstract-action';
import { ErrorHandleStatus } from 'checkout/state';
import { TypeKeys } from './type-keys';

export interface SetErrorStatus extends AbstractAction<ErrorHandleStatus> {
    type: TypeKeys.SET_ERROR_STATUS;
    payload: ErrorHandleStatus;
}

export const setErrorStatus = (status: ErrorHandleStatus): SetErrorStatus => ({
    type: TypeKeys.SET_ERROR_STATUS,
    payload: status
});
