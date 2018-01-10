import { FormName } from '../form-name';
import { FormFlowStatus } from './flow-status';
import { FlowViewInfo } from './flow-item-view';

export class FormFlowItem {
    formName: FormName;
    active: boolean;
    status: FormFlowStatus;
    view: FlowViewInfo;
    handledEventID?: number;

    constructor() {
        this.active = false;
        this.status = FormFlowStatus.unprocessed;
    }
}
