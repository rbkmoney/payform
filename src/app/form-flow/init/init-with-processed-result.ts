import {
    add, init,
    FormFlowItem,
    FormFlowStatus,
    FormName,
    ResultFormFlowItem,
    ResultSubject,
    ResultSubjectType
} from 'checkout/form-flow';
import { InvoiceChange } from 'checkout/backend';

export const initWithProcessedResult = (change: InvoiceChange): FormFlowItem[] => {
    let result: FormFlowItem[] = [];
    result = add(result, {
        formName: FormName.resultForm,
        status: FormFlowStatus.processed,
        subject: {
            type: ResultSubjectType.invoiceChange,
            change
        } as ResultSubject
    } as ResultFormFlowItem);
    return init(result);
};
