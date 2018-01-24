import { AbstractAction, TypeKeys } from 'checkout/actions';

export interface SetViewInfoError extends AbstractAction<boolean> {
    type: TypeKeys.SET_VIEW_INFO_ERROR;
    payload: boolean;
}

export const setViewInfoError = (hasError: boolean): SetViewInfoError => ({
    type: TypeKeys.SET_VIEW_INFO_ERROR,
    payload: hasError
});

export interface SetViewInfoHeight extends AbstractAction<number> {
    type: TypeKeys.SET_VIEW_INFO_HEIGHT;
    payload: number;
}

export const setViewInfoHeight = (height: number): SetViewInfoHeight => ({
    type: TypeKeys.SET_VIEW_INFO_HEIGHT,
    payload: height
});

export interface SetViewInfoInProcess extends AbstractAction<boolean> {
    type: TypeKeys.SET_VIEW_INFO_IN_PROCESS;
    payload: boolean;
}

export const setViewInfoInProcess = (inProcess: boolean): SetViewInfoInProcess => ({
    type: TypeKeys.SET_VIEW_INFO_IN_PROCESS,
    payload: inProcess
});
