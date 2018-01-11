import { ModalState } from 'checkout/state';
import { TypeKeys, SetModalState } from 'checkout/actions';

type ModalReducerAction = SetModalState;

export function modalReducer(s: ModalState = null, action: ModalReducerAction): ModalState {
    switch (action.type) {
        case TypeKeys.SET_MODAL_STATE:
            return action.payload;
    }
    return s;
}
