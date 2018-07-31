import { ModalName, ModalState } from '../modal-state';
import { BrowserRequest } from 'checkout/backend';

export enum ModalInteractionType {
    TokenizedInteraction = 'TokenizedInteraction',
    EventInteraction = 'EventInteraction'
}

interface InteractionObject {
    type: ModalInteractionType;
}

export interface TokenizedInteractionObject extends InteractionObject {
    uri: string;
}

export interface EventInteractionObject extends InteractionObject {
    request: BrowserRequest;
}

export class ModalInteraction extends ModalState {
    interactionObject: TokenizedInteractionObject | EventInteractionObject;
    pollingEvents: boolean;

    constructor(interactionObject: TokenizedInteractionObject | EventInteractionObject, active: boolean) {
        super();
        this.name = ModalName.modalInteraction;
        this.interactionObject = interactionObject;
        this.active = active;
        this.pollingEvents = false;
    }
}
