import { Dispatch } from 'redux';
import { AbstractAction, TypeKeys } from 'checkout/actions';
import { Invoice } from 'checkout/backend';
import { getInvoiceByID } from 'checkout/backend/get-invoice';

export interface GetInvoiceAction extends AbstractAction<Invoice> {
    type: TypeKeys.GET_INVOICE;
    payload: Invoice;
}

export type GetInvoiceDispatch = (dispatch: Dispatch<GetInvoiceAction>) => void;

export function getInvoiceAction(capiEndpoint: string, accessToken: string, invoiceID: string): GetInvoiceDispatch {
    return (dispatch) => {
        getInvoiceByID(capiEndpoint, accessToken, invoiceID).then((invoice) => {
            dispatch({
                type: TypeKeys.GET_INVOICE,
                payload: invoice
            });
        });
    };
}
