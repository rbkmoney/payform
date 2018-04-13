import { AbstractAction, TypeKeys } from 'checkout/actions';
import { Invoice } from 'checkout/backend';

export interface InvoiceCreatedPayload {
    invoice: Invoice;
    invoiceAccessToken: string;
}

export interface InvoiceCreated extends AbstractAction<InvoiceCreatedPayload> {
    type: TypeKeys.INVOICE_CREATED;
    payload: InvoiceCreatedPayload;
}
