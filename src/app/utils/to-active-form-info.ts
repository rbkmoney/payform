import {FormName, ModalForms, ModalName, ModalState} from 'checkout/state';
import {findNamed} from 'checkout/utils/find-named';

export const toActiveFormName = (m: ModalState[]): FormName => {
    const formsInfo = (findNamed(m, ModalName.modalForms) as ModalForms).formsInfo;
    let result = null;
    formsInfo.forEach((formInfo) => {
        if (formInfo.active) {
            result = formInfo.name;
        }
    });

    return result;
};
