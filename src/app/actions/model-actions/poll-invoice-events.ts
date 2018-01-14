import { Dispatch } from 'redux';
import { AbstractAction, SetErrorAction, TypeKeys } from 'checkout/actions';
import { ChangeType, InvoiceCreated } from 'checkout/backend';
import { Event } from 'checkout/backend/model';
import { pollEvents } from './operations';
import { findChange } from 'checkout/utils';

export interface PollInvoiceEvents extends AbstractAction<Event[]> {
    type: TypeKeys.POLL_EVENTS;
    payload: Event[];
}

export type PollInvoiceEventsDispatch = (dispatch: Dispatch<PollInvoiceEvents | SetErrorAction>) => void;

export const pollInvoiceEvents = (capiEndpoint: string, accessToken: string, events: Event[]): PollInvoiceEventsDispatch =>
    (dispatch) => {
        const change = findChange(events, ChangeType.InvoiceCreated) as InvoiceCreated;
        const subject = {
            invoiceID: change.invoice.id,
            accessToken
        };
        pollEvents(capiEndpoint, subject, events)
            .then((event) => dispatch({
                type: TypeKeys.POLL_EVENTS,
                payload: event
            }));
    };
