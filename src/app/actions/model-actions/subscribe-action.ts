import { Dispatch } from 'redux';
import { AbstractAction, SetErrorAction, TypeKeys } from 'checkout/actions';
import { CustomerEvent } from 'checkout/backend/model';
import { CardFormValues, ConfigState, ModelState } from 'checkout/state';
import { subscribe as subscribeOperation } from './operations';

export interface Subscribe extends AbstractAction<CustomerEvent[]> {
    type: TypeKeys.SUBSCRIBE;
    payload: CustomerEvent[];
}

export type SubscribeDispatch = (dispatch: Dispatch<Subscribe | SetErrorAction>) => void;

export const subscribeOld = (c: ConfigState, m: ModelState, v: CardFormValues): SubscribeDispatch =>
    (dispatch) => subscribeOperation(c, m, v)
        .then((payload) => dispatch({
            type: TypeKeys.SUBSCRIBE,
            payload
        }))
        .catch((error) => dispatch({
            type: TypeKeys.SET_ERROR,
            payload: error
        }));
