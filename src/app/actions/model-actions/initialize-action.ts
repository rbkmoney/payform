import { AbstractAction, TypeKeys } from 'checkout/actions';
import { ModelState } from 'checkout/state';

export interface Initialize extends AbstractAction<ModelState> {
    type: TypeKeys.INIT_MODEL;
    payload: ModelState;
}
