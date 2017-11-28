import { TypeKeys } from '../type-keys';
import { Dispatch } from 'redux';
import { ResultState } from '../../state';
import { ResultAction } from './result-action';

export function close(): Dispatch<ResultAction> {
    return (dispatch: Dispatch<ResultAction>) => {
        dispatch({
            type: TypeKeys.SET_RESULT,
            payload: ResultState.close
        } as ResultAction);
    };
}
