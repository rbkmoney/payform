import { add, FormFlowItem, FormFlowStatus, FormName, init, ResultFormFlowItem } from 'checkout/form-flow';
import { InvoiceChange } from 'checkout/backend';
import { FlowItemViewAnimation } from 'checkout/form-flow/flow-item/flow-item-view';

export const initWithProcessedResult = (change: InvoiceChange): FormFlowItem[] => {
    let result: FormFlowItem[] = [];
    result = add(result, {
        formName: FormName.resultForm,
        status: FormFlowStatus.processed,
        change,
        view: {
            animation: FlowItemViewAnimation.formsAnimation
        }
    } as ResultFormFlowItem);
    return init(result);
};
