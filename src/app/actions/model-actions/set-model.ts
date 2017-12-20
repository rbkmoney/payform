import { AbstractAction, TypeKeys } from 'checkout/actions';
import { ModelState } from 'checkout/state';

export interface SetModel extends AbstractAction<ModelState> {
    type: TypeKeys.SET_MODEL;
}

export const setModel = (model: ModelState): SetModel => ({
    type: TypeKeys.SET_MODEL,
    payload: model
});
