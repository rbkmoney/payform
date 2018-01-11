import { ModalState } from 'checkout/state';
import { AbstractAction, TypeKeys } from 'checkout/actions';

export interface SetModalState extends AbstractAction<ModalState> {
    type: TypeKeys.SET_MODAL_STATE;
    payload: ModalState;
}
