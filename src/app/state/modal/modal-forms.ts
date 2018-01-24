import { ModalName, ModalState } from '../modal-state';
import { FormInfo, FormViewInfo, SlideDirection } from './form-info';

export class ModalForms extends ModalState {

    formsInfo: FormInfo[];
    viewInfo: FormViewInfo;

    constructor(formsInfo: FormInfo[], active: boolean) {
        super();
        this.name = ModalName.modalForms;
        this.viewInfo = {
            slideDirection: SlideDirection.right
        };
        this.formsInfo = formsInfo;
        this.active = active;
    }
}
