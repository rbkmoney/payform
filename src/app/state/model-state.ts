import {
    InvoiceTemplate,
    Invoice,
    PaymentMethod,
    Event,
    PaymentResource,
    Payment
} from 'checkout/backend/model';

export type ModelState = {
    readonly invoiceTemplate?: InvoiceTemplate;
    readonly invoice?: Invoice;
    readonly invoiceAccessToken?: string;
    readonly invoiceEvents?: Event[];
    readonly paymentMethods?: PaymentMethod[];
    readonly paymentResource?: PaymentResource;
    readonly payment?: Payment;
    readonly processed: boolean;
}
