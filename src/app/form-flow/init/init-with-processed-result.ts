import {
    add, init,
    FormFlowItem,
    FormFlowStatus,
    FormName,
    FormHeight,
    ResultFormFlowItem,
    ResultSubject,
    ResultSubjectType,
    DirectionTransition
} from 'checkout/form-flow';
import { InvoiceChange } from 'checkout/backend';

export const initWithProcessedResult = (change: InvoiceChange): FormFlowItem[] => {
    let result: FormFlowItem[] = [];
    result = add(result, {
        formName: FormName.resultForm,
        status: FormFlowStatus.processed,
        view: {
            slideDirection: DirectionTransition.right,
            height: FormHeight.resultForm
        },
        subject: {
            type: ResultSubjectType.invoiceChange,
            change
        } as ResultSubject
    } as ResultFormFlowItem);
    return init(result);
};
