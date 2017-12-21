import {
    add,
    FormFlowItem,
    FormFlowStatus,
    FormName,
    getLastChange, getLastEventID,
    ResultFormFlowItem,
    DirectionTransition,
    FormSizeClass
} from 'checkout/form-flow';
import { FormContainerProps } from '../form-container-props';

export const prepareResultFlow = (f: FormFlowItem[], p: FormContainerProps): FormFlowItem[] => {
    return add(f, {
        formName: FormName.resultForm,
        active: true,
        status: FormFlowStatus.processed,
        change: getLastChange(p.model.invoiceEvents),
        handledEventID: getLastEventID(p.model.invoiceEvents), // TODO fix it,
        view: {
            slideDirection: DirectionTransition.right,
            formSizeClass: FormSizeClass._resultForm
        }
    } as ResultFormFlowItem);
};
