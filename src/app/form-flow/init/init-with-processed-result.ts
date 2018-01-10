import {
    add, init,
    FormFlowItem,
    FormFlowStatus,
    FormName,
    ResultFormFlowItem,
    ResultSubjectType,
    DirectionTransition
} from 'checkout/form-flow';
import { InvoiceChange } from 'checkout/backend';
import { ResultSubjectInvoiceChange } from 'checkout/form-flow/flow-item/result-form-flow-item';

export const initWithProcessedResult = (change: InvoiceChange): FormFlowItem[] => {
    let result: FormFlowItem[] = [];
    result = add(result, new ResultFormFlowItem({
        formName: FormName.resultForm,
        active: true,
        status: FormFlowStatus.processed,
        view: {
            slideDirection: DirectionTransition.right,
            height: 392
        },
        subject: {
            type: ResultSubjectType.invoiceChange,
            change
        } as ResultSubjectInvoiceChange
    }));
    return init(result);
};
