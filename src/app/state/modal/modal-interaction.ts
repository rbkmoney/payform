import { ModalName, ModalState } from '../modal-state';
import { BrowserPostRequest } from 'checkout/backend';

export class ModalInteraction extends ModalState {
    request: BrowserPostRequest;

    constructor(request: BrowserPostRequest) {
        super();
        this.name = ModalName.modalInteraction;
        this.request = request;
    }
}
