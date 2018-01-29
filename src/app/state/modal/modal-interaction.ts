import { ModalName, ModalState } from '../modal-state';
import { BrowserRequest } from 'checkout/backend';

export class ModalInteraction extends ModalState {
    request: BrowserRequest;
    pollingEvents: boolean;

    constructor(request: BrowserRequest, active: boolean) {
        super();
        this.name = ModalName.modalInteraction;
        this.request = request;
        this.active = active;
        this.pollingEvents = false;
    }
}
