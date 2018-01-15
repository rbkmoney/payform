import { ModelState, ModelStatus } from 'checkout/state';
import {
    TypeKeys,
    PayAction,
    Accept,
    PollInvoiceEvents,
    Initialize
} from 'checkout/actions';
import { Event } from 'checkout/backend';

type ModelReducerAction =
    PayAction |
    Accept |
    PollInvoiceEvents |
    Initialize;

const initialState = {
    status: ModelStatus.none
};

const mergeEvents = (stateEvents: Event[], actionEvents: Event[]) => {
    const first = actionEvents[0];
    const sliced = stateEvents ? stateEvents.slice(0, first ? first.id : undefined) : [];
    return sliced.concat(actionEvents);
};

export function modelReducer(s: ModelState = initialState, action: ModelReducerAction): ModelState {
    switch (action.type) {
        case TypeKeys.INIT_MODEL:
            return {
                ...s,
                ...action.payload,
                status: ModelStatus.initialized
            };
        case TypeKeys.PAY:
            return {
                ...s,
                invoiceEvents: mergeEvents(s.invoiceEvents, action.payload.invoiceEvents),
                invoiceAccessToken: action.payload.invoiceAccessToken,
                status: ModelStatus.refreshed

            };
        case TypeKeys.POLL_EVENTS:
            return {
                ...s,
                invoiceEvents: mergeEvents(s.invoiceEvents, action.payload),
                status: ModelStatus.refreshed
            };
        case TypeKeys.ACCEPT_MODEL:
            return {
                ...s,
                status: ModelStatus.accepted
            };
    }
    return s;
}
