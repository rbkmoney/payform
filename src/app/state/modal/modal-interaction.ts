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
    type: ModalInteractionType.TokenizedInteraction;
    uri: string;
}

export interface EventInteractionObject extends InteractionObject {
    type: ModalInteractionType.EventInteraction;
    request: BrowserRequest;
}

export class ModalInteraction extends ModalState {
    interactionObject: InteractionObject;
    pollingEvents: boolean;

    constructor(interactionObject: InteractionObject, active: boolean) {
        super();
        this.name = ModalName.modalInteraction;
        this.interactionObject = interactionObject;
        this.active = active;
        this.pollingEvents = false;
    }
}
