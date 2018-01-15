import { Action } from 'redux';

export interface AbstractAction<P = null, M = null> extends Action {
    payload?: P;
    meta?: M;
}
