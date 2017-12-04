import { Dispatch } from 'redux';
import { PaymentMethod } from 'checkout/backend/model';
import { AbstractAction, SetErrorAction, TypeKeys } from '..';
import { getInvoicePaymentMethods } from 'checkout/backend';

export interface GetInvoicePaymentMethodsAction extends AbstractAction<PaymentMethod[]> {
    type: TypeKeys.GET_INVOICE_PAYMENT_METHODS;
    payload: PaymentMethod[];
}

export type GetInvoicePaymentMethodsDispatch = (dispatch: Dispatch<GetInvoicePaymentMethodsAction | SetErrorAction>) => void;

export const getInvoicePaymentMethodsAction = (capiEndpoint: string, accessToken: string, invoiceID: string): GetInvoicePaymentMethodsDispatch =>
    (dispatch) => getInvoicePaymentMethods(capiEndpoint, accessToken, invoiceID)
        .then((paymentMethods) => dispatch({
            type: TypeKeys.GET_INVOICE_PAYMENT_METHODS,
            payload: paymentMethods
        }))
        .catch((error) => dispatch({
            type: TypeKeys.SET_ERROR,
            payload: error
        }));
