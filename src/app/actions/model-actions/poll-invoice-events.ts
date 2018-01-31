import { Dispatch } from 'redux';
import { AbstractAction, SetErrorAction, TypeKeys } from 'checkout/actions';
import { InvoiceChangeType, InvoiceCreated } from 'checkout/backend';
import { Event } from 'checkout/backend/model';
import { pollInvoiceEvents as pollInvoiceEventsOperation } from './operations';
import { findChange } from 'checkout/utils';

export interface PollInvoiceEvents extends AbstractAction<Event[]> {
    type: TypeKeys.POLL_EVENTS;
    payload: Event[];
}

export type PollInvoiceEventsDispatch = (dispatch: Dispatch<PollInvoiceEvents | SetErrorAction>) => void;

export const pollInvoiceEvents = (capiEndpoint: string, accessToken: string, events: Event[]): PollInvoiceEventsDispatch =>
    (dispatch) => {
        const change = findChange(events, InvoiceChangeType.InvoiceCreated) as InvoiceCreated;
        const subject = {
            invoiceID: change.invoice.id,
            accessToken
        };
        pollInvoiceEventsOperation(capiEndpoint, subject, events)
            .then((event) => dispatch({
                type: TypeKeys.POLL_EVENTS,
                payload: event
            }))
            .catch((error) => dispatch({
                type: TypeKeys.SET_ERROR,
                payload: error
            }));
    };
