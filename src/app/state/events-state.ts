import { Event } from 'checkout/backend/model';

export enum EventsStatus {
    init = 'init',
    polled = 'polled',
    timeout = 'timeout'
}

export interface EventsState {
    readonly invoiceEventsStatus?: EventsStatus;
    readonly invoiceEvents?: Event[];
}
