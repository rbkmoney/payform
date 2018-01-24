import { Dispatch } from 'redux';
import { CardFormValues, ConfigState, ModelState } from 'checkout/state';
import { Event } from 'checkout/backend';
import { AbstractAction, SetErrorAction, TypeKeys } from 'checkout/actions';
import {
    payCardData as payCardDataOperation,
    payDigitalWalletQiwi as payDigitalWalletQiwiOperation
} from './operations';

export interface PayActionPayload {
    invoiceEvents: Event[];
    invoiceAccessToken: string;
}

export interface PayAction extends AbstractAction<PayActionPayload> {
    type: TypeKeys.PAY;
    payload: PayActionPayload;
}

export type PayDispatch = (dispatch: Dispatch<PayAction | SetErrorAction>) => void;

export const payCardData = (c: ConfigState, m: ModelState, v: CardFormValues): PayDispatch =>
    (dispatch) => payCardDataOperation(c, m, v)
        .then((payload) => dispatch({
            type: TypeKeys.PAY,
            payload
        }))
        .catch((error) => dispatch({
            type: TypeKeys.SET_ERROR,
            payload: error
        }));

// TODO change any to DigitalWalletFormValues
export const payDigitalWalletQiwi = (c: ConfigState, m: ModelState, v: any): PayDispatch =>
    (dispatch) => payDigitalWalletQiwiOperation(c, m, v)
        .then((payload) => dispatch({
            type: TypeKeys.PAY,
            payload
        }))
        .catch((error) => dispatch({
            type: TypeKeys.SET_ERROR,
            payload: error
        }));
