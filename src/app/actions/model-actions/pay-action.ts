import { Dispatch } from 'redux';
import { CardFormValues, ConfigState, ModelState } from 'checkout/state';
import { Event } from 'checkout/backend';
import { AbstractAction, SetErrorAction, TypeKeys } from 'checkout/actions';
import { pay as payOperation } from './operations';

export interface PayActionPayload {
    invoiceEvents: Event[];
    invoiceAccessToken: string;
}

export interface PayAction extends AbstractAction<PayActionPayload> {
    type: TypeKeys.PAY;
    payload: PayActionPayload;
}

export type PayDispatch = (dispatch: Dispatch<PayAction | SetErrorAction>) => void;

export const pay = (c: ConfigState, m: ModelState, v: CardFormValues): PayDispatch =>
    (dispatch) => payOperation(c, m, v)
        .then((payload) => dispatch({
            type: TypeKeys.PAY,
            payload
        }))
        .catch((error) => dispatch({
            type: TypeKeys.SET_ERROR,
            payload: error
        }));
