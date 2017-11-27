import { TypeKeys } from '../type-keys';
import { Dispatch } from 'redux';
import { Result } from '../../state';
import { ResultAction } from './result-action';

export function close(): Dispatch<ResultAction> {
    return (dispatch: Dispatch<ResultAction>) => {
        dispatch({
            type: TypeKeys.SET_RESULT,
            payload: Result.close
        } as ResultAction);
    };
}
