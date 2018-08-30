import { InvoiceTemplate, PaymentMethod, Invoice } from 'checkout/backend/model';

export interface ModelState {
    readonly invoiceTemplate?: InvoiceTemplate;
    readonly invoiceAccessToken?: string;
    readonly paymentMethods?: PaymentMethod[];
    readonly invoice?: Invoice;
}
