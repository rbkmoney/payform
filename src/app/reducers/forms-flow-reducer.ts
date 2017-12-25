import { TypeKeys, SetFormsFlowAction } from 'checkout/actions';
import { FormFlowItem } from 'checkout/form-flow';

type FormFlowReducerAction = SetFormsFlowAction;

export function formsFlowReducer(s: FormFlowItem[] = [], action: FormFlowReducerAction): FormFlowItem[] {
    switch (action.type) {
        case TypeKeys.SET_FORMS_FLOW:
            return action.payload;
    }
    return s;
}
