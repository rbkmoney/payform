import { Event } from 'checkout/backend/model';
import { CustomerEvent } from 'checkout/backend';

export enum EventsStatus {
    init = 'init',
    polling = 'polling',
    polled = 'polled',
    timeout = 'timeout'
}

export interface EventsState {
    readonly invoiceEvents?: Event[];
    readonly invoiceEventsStatus?: EventsStatus;
    readonly customerEvents?: CustomerEvent[];
    readonly customerEventsStatus?: EventsStatus;
}
