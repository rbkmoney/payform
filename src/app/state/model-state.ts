import {
    InvoiceTemplate,
    PaymentMethod,
    Event
} from 'checkout/backend/model';

export enum ModelStatus {
    initialized = 'initialized',
    refreshed = 'refreshed',
    accepted = 'accepted',
    none = 'none'
}

export interface ModelState {
    readonly invoiceTemplate?: InvoiceTemplate;
    readonly invoiceAccessToken?: string;
    readonly invoiceEvents?: Event[];
    readonly paymentMethods?: PaymentMethod[];
    readonly status?: ModelStatus;
}
