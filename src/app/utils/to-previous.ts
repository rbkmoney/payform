import {FormInfo, FormName, ModalForms, ModalName, ModalState} from 'checkout/state';
import {findNamed} from 'checkout/utils/find-named';

export const toPrevious = (modals: ModalState[], formName: FormName): FormName => {
    const formsInfo = (findNamed(modals, ModalName.modalForms) as ModalForms).formsInfo;
    return (findNamed(formsInfo, formName) as FormInfo).previous;
};
