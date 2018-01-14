import { AbstractAction, TypeKeys } from 'checkout/actions';
import { FormName } from 'checkout/state';

interface Meta {
    formName: FormName;
}

export interface SetViewInfoError extends AbstractAction<boolean, Meta> {
    type: TypeKeys.SET_VIEW_INFO_ERROR;
    payload: boolean;
    meta: Meta;
}

export const setViewInfoError = (hasError: boolean, formName: FormName): SetViewInfoError => ({
    type: TypeKeys.SET_VIEW_INFO_ERROR,
    payload: hasError,
    meta: {
        formName
    }
});

export interface SetViewInfoInProcess extends AbstractAction<boolean, Meta> {
    type: TypeKeys.SET_VIEW_INFO_IN_PROCESS;
    payload: boolean;
    meta: Meta;
}

export const setViewInfoInProcess = (inProcess: boolean, formName: FormName): SetViewInfoInProcess => ({
    type: TypeKeys.SET_VIEW_INFO_IN_PROCESS,
    payload: inProcess,
    meta: {
        formName
    }
});
