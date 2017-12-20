import { FormName } from '../form-name';
import { FormFlowStatus } from './flow-status';
import { FlowItemView } from './flow-item-view';

export class FormFlowItem {
    formName: FormName;
    active: boolean;
    status: FormFlowStatus;
    handledEventID?: number;
    view: FlowItemView;

    constructor(handledEventID?: number) {
        this.formName = FormName.modalInteraction;
        this.active = false;
        this.status = FormFlowStatus.unprocessed;
        this.handledEventID = handledEventID;
    }
}
