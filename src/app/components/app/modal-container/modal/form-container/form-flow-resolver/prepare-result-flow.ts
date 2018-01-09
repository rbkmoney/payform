import {
    add,
    FormFlowItem,
    FormFlowStatus,
    FormName,
    getLastChange,
    getLastEventID,
    ResultFormFlowItem,
    DirectionTransition,
    FormHeight,
    ResultSubjectType
} from 'checkout/form-flow';
import { FormContainerProps } from '../form-container-props';

export const prepareResultFlow = (f: FormFlowItem[], p: FormContainerProps): FormFlowItem[] => {
    return add(f, {
        formName: FormName.resultForm,
        active: true,
        status: FormFlowStatus.processed,
        handledEventID: getLastEventID(p.model.invoiceEvents), // TODO fix it,
        view: {
            slideDirection: DirectionTransition.right,
            height: FormHeight.resultForm
        },
        subject: {
            type: ResultSubjectType.invoiceChange,
            change: getLastChange(p.model.invoiceEvents)
        }
    } as ResultFormFlowItem);
};
