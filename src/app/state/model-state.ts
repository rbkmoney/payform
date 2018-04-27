import {
    InvoiceTemplate,
    PaymentMethod,
    Event,
    CustomerEvent,
    Invoice
} from 'checkout/backend/model';

export interface ModelState {
    readonly invoiceTemplate?: InvoiceTemplate;
    readonly invoiceAccessToken?: string;
    readonly invoiceEvents?: Event[];
    readonly paymentMethods?: PaymentMethod[];
    readonly customerEvents?: CustomerEvent[];
    readonly invoice?: Invoice;
}
