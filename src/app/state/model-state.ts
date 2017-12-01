import { InvoiceTemplate, Invoice } from 'checkout/backend/model';

export type ModelState = {
    invoiceTemplate?: InvoiceTemplate;
    invoice?: Invoice;
}
