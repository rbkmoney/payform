import { AbstractAction, TypeKeys } from 'checkout/actions';
import { ModalState } from 'checkout/state';

export interface InitializeModalCompleted extends AbstractAction<ModalState> {
    type: TypeKeys.INITIALIZE_MODAL_COMPLETED;
    payload: ModalState;
}
