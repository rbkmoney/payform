import {FormName} from 'checkout/state';
import { AbstractAction, TypeKeys } from 'checkout/actions';

export interface SetActiveFormInfo extends AbstractAction<FormName> {
    type: TypeKeys.SET_ACTIVE_FORM_INFO;
    payload: FormName;
}
