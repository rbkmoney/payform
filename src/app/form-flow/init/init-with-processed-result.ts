import {
    add,
    init,
    FormFlowItem,
    FormFlowStatus,
    FormName,
    FormSizeClass,
    ResultFormFlowItem
} from 'checkout/form-flow';
import { InvoiceChange } from 'checkout/backend';
import { DirectionTransition } from 'checkout/form-flow/flow-item/flow-item-view';

export const initWithProcessedResult = (change: InvoiceChange): FormFlowItem[] => {
    let result: FormFlowItem[] = [];
    result = add(result, {
        formName: FormName.resultForm,
        status: FormFlowStatus.processed,
        change,
        view: {
            slideDirection: DirectionTransition.right,
            formSizeClass: FormSizeClass.resultForm
        }
    } as ResultFormFlowItem);
    return init(result);
};
