import { ModalName, ModalState } from '../modal-state';
import { FormInfo } from './form-info';

export class ModalForms extends ModalState {

    formInfo: FormInfo;

    constructor(formInfo: FormInfo) {
        super();
        this.name = ModalName.modalForms;
        this.formInfo = formInfo;
    }
}
