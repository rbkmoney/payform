import { Dispatch } from 'redux';
import { TypeKeys, AbstractAction, SetErrorAction } from '../';
import { InvoiceParamsWithTemplate } from 'checkout/backend/model';
import { createInvoiceWithTemplate as capiRequest, InvoiceAndToken } from 'checkout/backend';

export interface CreateInvoiceWithTemplate extends AbstractAction<InvoiceAndToken> {
    type: TypeKeys.CREATE_INVOICE_WITH_TEMPLATE;
    payload: InvoiceAndToken;
}

export type CreateInvoiceWithTemplateDispatch = (dispatch: Dispatch<CreateInvoiceWithTemplate | SetErrorAction>) => void;

export const createInvoiceWithTemplate = (capiEndpoint: string, accessToken: string, invoiceTemplateID: string, params: InvoiceParamsWithTemplate): CreateInvoiceWithTemplateDispatch =>
    (dispatch) => capiRequest(capiEndpoint, accessToken, invoiceTemplateID, params)
        .then((paymentResource) => dispatch({
            type: TypeKeys.CREATE_INVOICE_WITH_TEMPLATE,
            payload: paymentResource
        }))
        .catch((error) => dispatch({
            type: TypeKeys.SET_ERROR,
            payload: error
        }));
