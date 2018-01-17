import {FormInfo, FormName, ModalForms, ModalName, ModalState} from 'checkout/state';
import {TypeKeys} from 'checkout/actions';
import {SetActiveFormInfo} from './set-active-form-info';
import {findNamed} from 'checkout/utils';

export const setActiveFormInfo = (formName: FormName, modals: ModalState[]): SetActiveFormInfo => {
    const formsInfos = (findNamed(modals, ModalName.modalForms) as ModalForms).formsInfo;
    const formInfo = findNamed(formsInfos, formName) as FormInfo;

    formInfo.active = true;

    return {
        type: TypeKeys.SET_ACTIVE_FORM_INFO,
        payload: formInfo
    };
};
