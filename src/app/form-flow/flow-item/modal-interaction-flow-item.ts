import { FormFlowItem } from './flow-item';
import { BrowserPostRequest } from 'checkout/backend';

export class ModalInteractionFlowItem extends FormFlowItem {
    request: BrowserPostRequest;
    handledEventID: number;

    constructor(request: BrowserPostRequest, handledEventID?: number) {
        super();
        this.handledEventID = handledEventID;
        this.request = request;
        this.view.height = 288;
    }
}
