import {FormName, ModalState} from 'checkout/state';
import {TypeKeys} from 'checkout/actions';
import {SetActiveFormInfo} from './set-active-form-info';

export const setActiveFormInfo = (formName: FormName, modals: ModalState[]): SetActiveFormInfo => {
    return {
        type: TypeKeys.SET_ACTIVE_FORM_INFO,
        payload: formName
    };
};
