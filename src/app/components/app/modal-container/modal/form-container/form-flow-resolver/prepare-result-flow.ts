import {
    add,
    FormFlowItem,
    FormFlowStatus,
    FormName,
    getLastChange, getLastEventID,
    ResultFormFlowItem
} from 'checkout/form-flow';
import { FormContainerProps } from '../form-container-props';
import { FlowItemViewAnimation } from 'checkout/form-flow/flow-item/flow-item-view';

export const prepareResultFlow = (f: FormFlowItem[], p: FormContainerProps): FormFlowItem[] => {
    return add(f, {
        formName: FormName.resultForm,
        active: true,
        status: FormFlowStatus.processed,
        change: getLastChange(p.model.invoiceEvents),
        handledEventID: getLastEventID(p.model.invoiceEvents), // TODO fix it,
        view: {
            animation: FlowItemViewAnimation.formsAnimation
        }
    } as ResultFormFlowItem);
};
