import { InvoiceTemplate, PaymentMethod, CustomerEvent, Invoice } from 'checkout/backend/model';

export interface ModelState {
    readonly invoiceTemplate?: InvoiceTemplate;
    readonly invoiceAccessToken?: string;
    readonly paymentMethods?: PaymentMethod[];
    readonly customerEvents?: CustomerEvent[];
    readonly invoice?: Invoice;
}
