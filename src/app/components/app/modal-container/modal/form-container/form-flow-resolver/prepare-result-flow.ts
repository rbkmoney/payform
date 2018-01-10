import {
    add,
    FormFlowItem,
    FormFlowStatus,
    FormName,
    getLastChange,
    getLastEventID,
    ResultFormFlowItem,
    DirectionTransition,
    ResultSubjectType
} from 'checkout/form-flow';
import { FormContainerProps } from '../form-container-props';

export const prepareResultFlow = (f: FormFlowItem[], p: FormContainerProps): FormFlowItem[] => {
    return add(f, new ResultFormFlowItem({
        formName: FormName.resultForm,
        active: true,
        status: FormFlowStatus.processed,
        handledEventID: getLastEventID(p.model.invoiceEvents), // TODO fix it,
        view: {
            slideDirection: DirectionTransition.right,
            height: 392
        },
        subject: {
            type: ResultSubjectType.invoiceChange,
            change: getLastChange(p.model.invoiceEvents)
        }
    }));
};
