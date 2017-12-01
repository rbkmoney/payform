import { InvoiceTemplate, Invoice } from 'checkout/backend/model';

export type ModelState = {
    readonly invoiceTemplate?: InvoiceTemplate;
    readonly invoice?: Invoice;
}
