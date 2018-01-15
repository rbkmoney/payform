import { ModalName, ModalState } from '../modal-state';
import { FormInfo } from './form-info';

export class ModalForms extends ModalState {

    formsInfo: FormInfo[];

    constructor(formsInfo: FormInfo[], active: boolean) {
        super();
        this.name = ModalName.modalForms;
        this.formsInfo = formsInfo;
        this.active = active;
    }
}
