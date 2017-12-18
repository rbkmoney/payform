import { add, FormFlowItem, FormFlowStatus, FormName, init, ResultFormFlowItem } from 'checkout/form-flow';
import { InvoiceChange } from 'checkout/backend';

export const initWithProcessedResult = (change: InvoiceChange): FormFlowItem[] => {
    let result: FormFlowItem[] = [];
    result = add(result, {
        formName: FormName.resultForm,
        status: FormFlowStatus.processed,
        change
    } as ResultFormFlowItem);
    return init(result);
};
