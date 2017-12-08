import { InvoiceTemplate, Invoice, PaymentMethod, Event } from 'checkout/backend/model';

export type ModelState = {
    readonly invoiceTemplate?: InvoiceTemplate;
    readonly invoice?: Invoice;
    readonly invoiceEvents?: Event[];
    readonly paymentMethods?: PaymentMethod[];
}
