import { clone } from 'lodash';
import { add, getByFormName, next, update, FormFlowItem, FormFlowStatus, FormName } from 'checkout/form-flow';
import { ResultFormFlowItem } from 'checkout/form-flow/flow-item';

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
