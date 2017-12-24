import { TypeKeys } from './type-keys';
import { ResultState } from '../state';
import { AbstractAction } from './abstract-action';

export interface ResultAction extends AbstractAction<ResultState> {
    type: TypeKeys.SET_RESULT;
    payload: ResultState;
}

export const setResult = (resultState: ResultState): ResultAction => ({
    type: TypeKeys.SET_RESULT,
    payload: resultState
});
