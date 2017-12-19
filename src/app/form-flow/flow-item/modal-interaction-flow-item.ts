import { FormFlowItem } from './flow-item';
import { BrowserPostRequest } from 'checkout/backend';

export class ModalInteractionFlowItem extends FormFlowItem {
    request: BrowserPostRequest;

    constructor(request: BrowserPostRequest, handledEventID?: number) {
        super(handledEventID);
        this.request = request;
    }
}
