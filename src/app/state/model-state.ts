import { InvoiceTemplate, Invoice, PaymentMethod } from 'checkout/backend/model';

export type ModelState = {
    readonly invoiceTemplate?: InvoiceTemplate;
    readonly invoice?: Invoice;
    readonly paymentMethods?: PaymentMethod[];
}
