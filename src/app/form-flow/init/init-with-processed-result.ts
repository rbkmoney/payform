import {
    add, init,
    FormFlowItem,
    FormFlowStatus,
    FormName,
    FormSizeClass,
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
        change,
        view: {
            slideDirection: DirectionTransition.right,
            formSizeClass: FormSizeClass.resultForm
        },
        subject: {
            type: ResultSubjectType.invoiceChange,
            change
        } as ResultSubject
    } as ResultFormFlowItem);
    return init(result);
};
