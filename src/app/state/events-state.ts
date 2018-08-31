import { Event } from 'checkout/backend';

export enum EventsStatus {
    init = 'init',
    polling = 'polling',
    polled = 'polled',
    timeout = 'timeout'
}

export interface EventsState {
    readonly events?: Event[];
    readonly status?: EventsStatus;
}
