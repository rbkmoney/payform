import { clone } from 'lodash';
import {
    add, update,
    FormFlowItem,
    FormFlowStatus,
    FormName,
    getByFormName, next,
    ResultFormFlowItem,
    FormSizeClass
} from 'checkout/form-flow';
import { DirectionTransition } from '../flow-item/flow-item-view';

const prepareResultFlow = (f: FormFlowItem[]): FormFlowItem[] => {
    return add(f, {
        formName: FormName.resultForm,
        active: true,
        status: FormFlowStatus.inProcess,
        view: {
            slideDirection: DirectionTransition.right,
            formSizeClass: FormSizeClass._resultForm
        }
    } as ResultFormFlowItem);
};

export const finishInteraction = (f: FormFlowItem[]): FormFlowItem[] => {
    const interaction = clone(getByFormName(f, FormName.modalInteraction));
    interaction.status = FormFlowStatus.processed;
    return next(prepareResultFlow(update(f, interaction)));
};
