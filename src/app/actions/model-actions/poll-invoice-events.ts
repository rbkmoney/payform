import { Dispatch } from 'redux';
import { AbstractAction, SetErrorAction, TypeKeys } from 'checkout/actions';
import { getInvoiceEvents as capiRequest } from 'checkout/backend';
import { Event } from 'checkout/backend/model';
import { check, Type } from 'checkout/event-checker';

export interface PollInvoiceEvents extends AbstractAction<Event[]> {
    type: TypeKeys.GET_INVOICE_EVENTS;
    payload: Event[];
}

export type PollInvoiceEventsDispatch = (dispatch: Dispatch<PollInvoiceEvents | SetErrorAction>) => void;

const pollingRetries = 60;
const pollingTimeout = 300;

export const pollInvoiceEvents = (capiEndpoint: string, accessToken: string, invoiceID: string): PollInvoiceEventsDispatch =>
    (dispatch) => {
        let pollCount = 0;
        (function poll() {
            setTimeout(() => {
                capiRequest(capiEndpoint, accessToken, invoiceID).then((events) => {
                    if (check(events).type !== Type.unexplained) {
                        dispatch({
                            type: TypeKeys.GET_INVOICE_EVENTS,
                            payload: events
                        });
                    } else {
                        pollCount++;
                        if (pollCount >= pollingRetries) {
                            dispatch({
                                type: TypeKeys.SET_ERROR,
                                payload: {code: 'error.events.timeout'}
                            });
                        } else {
                            poll();
                        }
                    }
                }).catch((error) => dispatch({
                    type: TypeKeys.SET_ERROR,
                    payload: error
                }));
            }, pollingTimeout);
        })();
    };
