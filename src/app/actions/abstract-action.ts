import { Action } from 'redux';

export interface AbstractAction<T> extends Action {
    payload: T;
}
