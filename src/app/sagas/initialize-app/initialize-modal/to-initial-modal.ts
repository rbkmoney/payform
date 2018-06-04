import { FormInfo, ModalForms } from 'checkout/state';

export const toInitialModal = (formInfo: FormInfo[]): ModalForms => new ModalForms(formInfo, true);
