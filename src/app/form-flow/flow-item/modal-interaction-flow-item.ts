import { FormFlowItem } from './flow-item';
import { BrowserPostRequest } from 'checkout/backend';
import { DirectionTransition } from 'checkout/form-flow';
import { FormName } from '../form-name';

export class ModalInteractionFlowItem extends FormFlowItem {
    request: BrowserPostRequest;
    handledEventID: number;

    constructor(request: BrowserPostRequest, handledEventID?: number) {
        super();
        this.handledEventID = handledEventID;
        this.request = request;
        this.formName = FormName.modalInteraction;
        this.view = {
            height: 288,
            slideDirection: DirectionTransition.left
        };
    }
}
