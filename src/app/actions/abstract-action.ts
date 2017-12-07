import { Action } from 'redux';

export interface AbstractAction<P, M = null> extends Action {
    payload?: P;
    meta?: M;
}
