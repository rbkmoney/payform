import {
    add,
    FormFlowItem,
    FormFlowStatus,
    FormName,
    ResultFormFlowItem
} from 'checkout/form-flow';
import { FormContainerProps } from '../form-container-props';
import { check } from 'checkout/event-checker';

export const prepareResultationFlow = (f: FormFlowItem[], p: FormContainerProps): FormFlowItem[] => {
    return add(f, {
        formName: FormName.resultForm,
        active: true,
        status: FormFlowStatus.processed,
        change: check(p.model.invoiceEvents).change
    } as ResultFormFlowItem);
};
