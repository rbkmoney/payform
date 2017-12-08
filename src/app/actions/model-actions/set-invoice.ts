import { AbstractAction, TypeKeys } from 'checkout/actions';
import { Invoice } from 'checkout/backend';

export interface SetInvoice extends AbstractAction<Invoice> {
    type: TypeKeys.SET_INVOICE;
    payload: Invoice;
}

export const setInvoice = (invoice: Invoice): SetInvoice => ({
    type: TypeKeys.SET_INVOICE,
    payload: invoice
});
