import { FormInfo } from 'checkout/state';
import { AbstractAction, TypeKeys } from 'checkout/actions';

export interface SetFormInfo extends AbstractAction<FormInfo> {
    type: TypeKeys.SET_FORM_INFO;
    payload: FormInfo;
}
