import { AbstractAction, TypeKeys } from 'checkout/actions';
import { ModelState } from 'checkout/state';

export interface InitializeModelCompleted extends AbstractAction<ModelState> {
    type: TypeKeys.INITIALIZE_MODEL_COMPLETED;
    payload: ModelState;
}
