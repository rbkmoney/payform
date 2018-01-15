import { ModalName, ModalState } from '../modal-state';
import { BrowserPostRequest } from 'checkout/backend';

export class ModalInteraction extends ModalState {
    request: BrowserPostRequest;

    constructor(request: BrowserPostRequest, active: boolean) {
        super();
        this.name = ModalName.modalInteraction;
        this.request = request;
        this.active = active;
    }
}
