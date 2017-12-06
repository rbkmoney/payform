import { AbstractAction, TypeKeys } from 'checkout/actions';

export interface InitFormsFlowDoneAction extends AbstractAction<boolean> {
    type: TypeKeys.FORMS_FLOW_INIT_DONE;
}

export const initFormsFlowDone = (): InitFormsFlowDoneAction => ({
    type: TypeKeys.FORMS_FLOW_INIT_DONE
});
