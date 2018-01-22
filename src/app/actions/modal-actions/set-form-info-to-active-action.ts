import { AbstractAction, TypeKeys } from 'checkout/actions';
import { FormName } from 'checkout/state';

export interface SetFormInfoToActive extends AbstractAction<FormName> {
    type: TypeKeys.SET_FORM_INFO_TO_ACTIVE;
    payload: FormName;
}

export const setFormInfoToActive = (formName: FormName) => ({
    type: TypeKeys.SET_FORM_INFO_TO_ACTIVE,
    payload: formName
});
