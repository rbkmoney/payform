import { Action } from 'redux';
import { TypeKeys } from '../type-keys';
import { ResultState } from '../../state';

export interface ResultAction extends Action {
    type: TypeKeys.SET_RESULT,
    payload: ResultState
}
