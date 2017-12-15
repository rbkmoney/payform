import { FormName } from '../form-name';
import { FormFlowStatus } from './flow-status';

export class FormFlowItem {
    formName: FormName;
    active: boolean;
    status: FormFlowStatus;
}
