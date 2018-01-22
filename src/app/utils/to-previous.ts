import {FormInfo, FormName, ModalForms, ModalName, ModalState} from 'checkout/state';
import {findNamed} from 'checkout/utils/find-named';

const toActiveFormName = (formsInfo: FormInfo[]): FormName => {
    return formsInfo.find((formInfo) => formInfo.active).name;
};

export const toPrevious = (modals: ModalState[]): FormName => {
    const formsInfo = (findNamed(modals, ModalName.modalForms) as ModalForms).formsInfo;
    return (findNamed(formsInfo, toActiveFormName(formsInfo)) as FormInfo).previous;
};
