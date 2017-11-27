import { Action } from 'redux';
import { TypeKeys } from '../type-keys';
import { Result } from '../../state';

export interface ResultAction extends Action {
    type: TypeKeys.SET_RESULT,
    payload: Result
}
