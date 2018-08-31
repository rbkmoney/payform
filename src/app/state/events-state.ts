import { CustomerEvent, InvoiceEvent } from 'checkout/backend';

export enum EventsStatus {
    init = 'init',
    polling = 'polling',
    polled = 'polled',
    timeout = 'timeout'
}

export interface EventsState {
    readonly invoiceEvents?: InvoiceEvent[];
    readonly invoiceEventsStatus?: EventsStatus;
    readonly customerEvents?: CustomerEvent[];
    readonly customerEventsStatus?: EventsStatus;
}
