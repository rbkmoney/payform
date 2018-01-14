import { AbstractAction, TypeKeys } from 'checkout/actions';
import { FormName, ModalName } from 'checkout/state';

export interface SetActiveModal extends AbstractAction<ModalName> {
    type: TypeKeys.SET_ACTIVE_MODAL;
    payload: ModalName;
}

export const setActiveModal = (name: ModalName): SetActiveModal => ({
    type: TypeKeys.SET_ACTIVE_MODAL,
    payload: name
});

export interface SetActiveFormInfo extends AbstractAction<FormName> {
    type: TypeKeys.SET_ACTIVE_FORM_INFO;
    payload: FormName;
}

export const setActiveFormInfo = (name: FormName): SetActiveFormInfo => ({
    type: TypeKeys.SET_ACTIVE_FORM_INFO,
    payload: name
});
