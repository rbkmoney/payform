import { AbstractAction, TypeKeys } from 'checkout/actions';

export interface SetViewInfoError extends AbstractAction<boolean> {
    type: TypeKeys.SET_VIEW_INFO_ERROR;
    payload: boolean;
}

export const setViewInfoError = (hasError: boolean): SetViewInfoError => ({
    type: TypeKeys.SET_VIEW_INFO_ERROR,
    payload: hasError
});

export interface SetViewInfoInProcess extends AbstractAction<boolean> {
    type: TypeKeys.SET_VIEW_INFO_IN_PROCESS;
    payload: boolean;
}

export const setViewInfoInProcess = (inProcess: boolean): SetViewInfoInProcess => ({
    type: TypeKeys.SET_VIEW_INFO_IN_PROCESS,
    payload: inProcess
});
