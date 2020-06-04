import { ModalName, ModalState } from '../modal-state';

export enum ModalInfoType {
    MobileCommerce = 'MobileCommerce'
}

export class ModalInfo extends ModalState {
    type: ModalInfoType;

    constructor(type: ModalInfoType, active: boolean) {
        super();
        this.name = ModalName.modalInfo;
        this.type = type;
        this.active = active;
    }
}
