import { clone } from 'lodash';
import {
    add, update,
    FormFlowItem,
    FormFlowStatus,
    FormName,
    getByFormName, next,
    ResultFormFlowItem
} from 'checkout/form-flow';

const prepareResultFlow = (f: FormFlowItem[]): FormFlowItem[] => add(f, {
    formName: FormName.resultForm,
    active: true,
    status: FormFlowStatus.inProcess
} as ResultFormFlowItem);

export const finishInteraction = (f: FormFlowItem[]): FormFlowItem[] => {
    const interaction = clone(getByFormName(f, FormName.modalInteraction));
    interaction.status = FormFlowStatus.processed;
    return next(prepareResultFlow(update(f, interaction)));
};
