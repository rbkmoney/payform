import { clone } from 'lodash';
import {
    add, update,
    FormFlowItem,
    FormFlowStatus,
    FormName,
    getByFormName, next,
    ResultFormFlowItem
} from 'checkout/form-flow';
import { FlowItemViewAnimation } from '../flow-item/flow-item-view';

const prepareResultFlow = (f: FormFlowItem[]): FormFlowItem[] => add(f, {
    formName: FormName.resultForm,
    active: true,
    status: FormFlowStatus.inProcess,
    view: {
        animation: FlowItemViewAnimation.formsAnimation
    }
} as ResultFormFlowItem);

export const finishInteraction = (f: FormFlowItem[]): FormFlowItem[] => {
    const interaction = clone(getByFormName(f, FormName.modalInteraction));
    interaction.status = FormFlowStatus.processed;
    return next(prepareResultFlow(update(f, interaction)));
};
