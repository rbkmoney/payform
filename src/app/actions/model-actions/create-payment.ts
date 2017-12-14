import { Dispatch } from 'redux';
import { TypeKeys, AbstractAction, SetErrorAction } from '../';
import { Payment, PaymentParams } from 'checkout/backend/model';
import { createPayment as capiRequest } from 'checkout/backend';

export interface CreatePayment extends AbstractAction<Payment> {
    type: TypeKeys.CREATE_PAYMENT;
    payload: Payment;
}

export type CreatePaymentDispatch = (dispatch: Dispatch<CreatePayment | SetErrorAction>) => void;

export const createPayment = (capiEndpoint: string, accessToken: string, invoiceID: string, paymentParams: PaymentParams): CreatePaymentDispatch =>
    (dispatch) => capiRequest(capiEndpoint, accessToken, invoiceID, paymentParams)
        .then((payment) => dispatch({
            type: TypeKeys.CREATE_PAYMENT,
            payload: payment
        }))
        .catch((error) => dispatch({
            type: TypeKeys.SET_ERROR,
            payload: error
        }));
