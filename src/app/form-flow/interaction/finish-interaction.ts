import { clone } from 'lodash';
import {
    add, update,
    FormFlowItem,
    FormFlowStatus,
    FormName,
    getByFormName, next,
    ResultFormFlowItem,
    DirectionTransition, ResultSubjectType
} from 'checkout/form-flow';
import { InvoiceChange } from 'checkout/backend';

const prepareResultFlow = (f: FormFlowItem[], change: InvoiceChange): FormFlowItem[] => {
    return add(f, new ResultFormFlowItem({
        formName: FormName.resultForm,
        active: true,
        status: FormFlowStatus.inProcess,
        view: {
            slideDirection: DirectionTransition.right,
            height: 392
        },
        subject: {
            change,
            type: ResultSubjectType.invoiceChange
        }
    }));
};

export const finishInteraction = (f: FormFlowItem[], change: InvoiceChange): FormFlowItem[] => {
    const interaction = clone(getByFormName(f, FormName.modalInteraction));
    interaction.status = FormFlowStatus.processed;
    return next(prepareResultFlow(update(f, interaction), change));
};
