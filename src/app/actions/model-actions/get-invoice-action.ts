import { Dispatch } from 'redux';
import { AbstractAction, TypeKeys, SetErrorAction } from '..';
import { Invoice, getInvoiceByID } from 'checkout/backend';

export interface GetInvoiceAction extends AbstractAction<Invoice> {
    type: TypeKeys.GET_INVOICE;
    payload: Invoice;
}

export type GetInvoiceDispatch = (dispatch: Dispatch<GetInvoiceAction | SetErrorAction>) => void;

export function getInvoiceAction(capiEndpoint: string, accessToken: string, invoiceID: string): GetInvoiceDispatch {
    return (dispatch) =>
        getInvoiceByID(capiEndpoint, accessToken, invoiceID)
            .then((invoice) => dispatch({
                type: TypeKeys.GET_INVOICE,
                payload: invoice
            }))
            .catch((error) => dispatch({
                type: TypeKeys.SET_ERROR,
                payload: error // TODO check 500 errors
            }));
}
