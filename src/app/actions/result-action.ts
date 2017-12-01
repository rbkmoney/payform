import { Dispatch } from 'redux';
import { TypeKeys } from './type-keys';
import { ResultState } from '../state';
import { AbstractAction } from './abstract-action';

export interface ResultAction extends AbstractAction<ResultState> {
    type: TypeKeys.SET_RESULT;
    payload: ResultState;
}

export type CloseDispatch = (dispatch: Dispatch<ResultAction>) => void;

export function close(): CloseDispatch {
    return (dispatch) => {
        dispatch({
            type: TypeKeys.SET_RESULT,
            payload: ResultState.close
        });
    };
}
