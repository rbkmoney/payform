import { AbstractAction, TypeKeys } from 'checkout/actions';
import { LogicError } from 'checkout/backend';

export interface FinishInteractionRequested extends AbstractAction {
    type: TypeKeys.FINISH_INTERACTION_REQUESTED;
}

export interface FinishInteractionCompleted extends AbstractAction {
    type: TypeKeys.FINISH_INTERACTION_COMPLETED;
}

export interface FinishInteractionFailed extends AbstractAction<LogicError> {
    type: TypeKeys.FINISH_INTERACTION_FAILED;
    payload: LogicError;
}

export const finishInteraction = () => ({
    type: TypeKeys.FINISH_INTERACTION_REQUESTED
});
