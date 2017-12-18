import {
    add,
    FormFlowItem,
    FormFlowStatus,
    FormName, getLastChange,
    ResultFormFlowItem
} from 'checkout/form-flow';
import { FormContainerProps } from '../form-container-props';

export const prepareResultationFlow = (f: FormFlowItem[], p: FormContainerProps): FormFlowItem[] => {
    return add(f, {
        formName: FormName.resultForm,
        active: true,
        status: FormFlowStatus.processed,
        change: getLastChange(p.model.invoiceEvents)
    } as ResultFormFlowItem);
};
