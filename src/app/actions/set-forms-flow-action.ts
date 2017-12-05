import { AbstractAction } from '.';
import { FormFlowItem } from 'checkout/state';
import { TypeKeys } from 'checkout/actions/type-keys';

export interface SetFormsFlowAction extends AbstractAction<FormFlowItem[]> {
    type: TypeKeys.SET_FORMS_FLOW;
    payload: FormFlowItem[];
}

export const setFormFlowAction = (formFlow: FormFlowItem[]): SetFormsFlowAction => ({
    type: TypeKeys.SET_FORMS_FLOW,
    payload: formFlow
});
