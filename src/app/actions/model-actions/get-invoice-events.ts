import { Dispatch } from 'redux';
import { AbstractAction, SetErrorAction, TypeKeys } from 'checkout/actions';
import { getInvoiceEvents as capiRequest } from 'checkout/backend';
import { Event } from 'checkout/backend/model';

export interface GetInvoiceEvents extends AbstractAction<Event[]> {
    type: TypeKeys.GET_INVOICE_EVENTS;
    payload: Event[];
}

export type GetInvoiceEventsDispatch = (dispatch: Dispatch<GetInvoiceEvents | SetErrorAction>) => void;

export const getInvoiceEvents = (capiEndpoint: string, accessToken: string, invoiceID: string): GetInvoiceEventsDispatch =>
    (dispatch) => capiRequest(capiEndpoint, accessToken, invoiceID)
        .then((events) => dispatch({
            type: TypeKeys.GET_INVOICE_EVENTS,
            payload: events
        }))
        .catch((error) => dispatch({
            type: TypeKeys.SET_ERROR,
            payload: error
        }));
