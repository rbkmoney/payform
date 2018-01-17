import { FormInfo } from 'checkout/state';
import { AbstractAction, TypeKeys } from 'checkout/actions';

export interface SetActiveFormInfo extends AbstractAction<FormInfo> {
    type: TypeKeys.SET_ACTIVE_FORM_INFO;
    payload: FormInfo;
}
