import { clone } from 'lodash';
import {
    add, update,
    FormFlowItem,
    FormFlowStatus,
    FormName,
    getByFormName, next,
    ResultFormFlowItem,
    FormHeight,
    DirectionTransition
} from 'checkout/form-flow';

const prepareResultFlow = (f: FormFlowItem[]): FormFlowItem[] => {
    return add(f, {
        formName: FormName.resultForm,
        active: true,
        status: FormFlowStatus.inProcess,
        view: {
            slideDirection: DirectionTransition.right,
            height: FormHeight.resultForm
        }
    } as ResultFormFlowItem);
};

export const finishInteraction = (f: FormFlowItem[]): FormFlowItem[] => {
    const interaction = clone(getByFormName(f, FormName.modalInteraction));
    interaction.status = FormFlowStatus.processed;
    return next(prepareResultFlow(update(f, interaction)));
};
