import { clone } from 'lodash';
import { add, getByFormName, next, update } from 'checkout/components/app/form-flow-manager';
import { FormFlowItem, FormFlowStatus, FormName } from 'checkout/state';

const prepareResultFlow = (f: FormFlowItem[]): FormFlowItem[] => add(f, {
    formName: FormName.resultForm,
    active: true,
    status: FormFlowStatus.inProcess
});

export const finishInteraction = (f: FormFlowItem[]): FormFlowItem[] => {
    const interaction = clone(getByFormName(f, FormName.modalInteraction));
    interaction.status = FormFlowStatus.processed;
    return next(prepareResultFlow(update(f, interaction)));
};
