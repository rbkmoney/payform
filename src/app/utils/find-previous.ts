import { FormInfo, ModalForms, ModalName, ModalState } from 'checkout/state';
import { findNamed } from './find-named';

export const findInfoWithPrevious = (modals: ModalState[]): FormInfo => {
    const formsInfo = (findNamed(modals, ModalName.modalForms) as ModalForms).formsInfo;
    return formsInfo.find((formInfo) => formInfo.active && !!formInfo.previous);
};
