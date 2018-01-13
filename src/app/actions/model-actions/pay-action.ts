import { Dispatch } from 'redux';
import { CardFormValues, ConfigState, ModelState } from 'checkout/state';
import { Event } from 'checkout/backend';
import { AbstractAction, SetErrorAction, TypeKeys } from 'checkout/actions';
import { pay as payOperation } from './operations';

export interface PayAction extends AbstractAction<Event[]> {
    type: TypeKeys.PAY;
    payload: Event[];
}

export type PayDispatch = (dispatch: Dispatch<PayAction | SetErrorAction>) => void;

export const pay = (c: ConfigState, m: ModelState, v: CardFormValues): PayDispatch =>
    (dispatch) => payOperation(c, m, v)
        .then((events) => dispatch({
            type: TypeKeys.PAY,
            payload: events
        }))
        .catch((error) => dispatch({
            type: TypeKeys.SET_ERROR,
            payload: error
        }));
