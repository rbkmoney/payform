import { Dispatch } from 'redux';
import { PaymentMethod } from 'checkout/backend/model';
import { AbstractAction, SetErrorAction, TypeKeys } from '..';
import { getInvoicePaymentMethodsByTemplateID } from 'checkout/backend';

export interface GetInvoicePaymentMethodsByTemplateIdAction extends AbstractAction<PaymentMethod[]> {
    type: TypeKeys.GET_INVOICE_PAYMENT_METHODS_BY_TEMPLATE_ID;
    payload: PaymentMethod[];
}

export type GetInvoicePaymentMethodsByTemplateIdDispatch = (dispatch: Dispatch<GetInvoicePaymentMethodsByTemplateIdAction | SetErrorAction>) => void;

export const getInvoicePaymentMethodsByTemplateIdAction = (capiEndpoint: string, accessToken: string, invoiceTemplateID: string): GetInvoicePaymentMethodsByTemplateIdDispatch =>
    (dispatch) => getInvoicePaymentMethodsByTemplateID(capiEndpoint, accessToken, invoiceTemplateID)
        .then((paymentMethods) => dispatch({
            type: TypeKeys.GET_INVOICE_PAYMENT_METHODS_BY_TEMPLATE_ID,
            payload: paymentMethods
        }))
        .catch((error) => dispatch({
            type: TypeKeys.SET_ERROR,
            payload: error
        }));
