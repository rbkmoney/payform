import { AbstractAction } from '.';
import { TypeKeys } from 'checkout/actions/type-keys';
import { FormFlowItem } from 'checkout/form-flow';

export interface SetFormsFlowAction extends AbstractAction<FormFlowItem[]> {
    type: TypeKeys.SET_FORMS_FLOW;
    payload: FormFlowItem[];
}

export const setFormFlowAction = (formFlow: FormFlowItem[]): SetFormsFlowAction => ({
    type: TypeKeys.SET_FORMS_FLOW,
    payload: formFlow
});
