import { AbstractAction, TypeKeys } from '.';
import { ErrorState } from 'checkout/state';

export interface SetErrorAction extends AbstractAction<ErrorState> {
    type: TypeKeys.SET_ERROR,
    payload: ErrorState
}
