import { AbstractAction, TypeKeys } from 'checkout/actions';

export interface SetModalInteractionPolling extends AbstractAction<boolean> {
    type: TypeKeys.SET_MODAL_INTERACTION_POLLING;
    payload: boolean;
}
