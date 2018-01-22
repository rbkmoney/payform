import {FormName, ModalForms, ModalName, ModalState} from 'checkout/state';
import {findNamed} from 'checkout/utils/find-named';

export const toActiveFormName = (m: ModalState[]): FormName => {
    const formsInfo = (findNamed(m, ModalName.modalForms) as ModalForms).formsInfo;
    return formsInfo.find((formInfo) => formInfo.active).name;
};
