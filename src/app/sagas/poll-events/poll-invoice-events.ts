import last from 'lodash-es/last';
import uniqWith from 'lodash-es/uniqWith';
import { delay } from 'redux-saga';
import { call, select, put, race, CallEffect, PutEffect, RaceEffect, SelectEffect } from 'redux-saga/effects';
import { InvoiceChangeType, Event, getInvoiceEvents } from 'checkout/backend';
import { EventPolled, TypeKeys } from 'checkout/actions';
import { State } from 'checkout/state';

const isStop = (event: Event): boolean => {
    if (!event || !event.changes) {
        return false;
    }
    const change = last(event.changes);
    if (!change) {
        return false;
    }
    switch (change.changeType) {
        case InvoiceChangeType.InvoiceStatusChanged:
        case InvoiceChangeType.PaymentStatusChanged:
        case InvoiceChangeType.PaymentInteractionRequested:
            return true;
        default:
            return false;
    }
};

interface PollResult {
    events: Event[];
    last: Event;
}

function* getLastEventID(): Iterator<SelectEffect | number> {
    return yield select((s: State) => {
        const events = s.model.invoiceEvents;
        return events && events.length > 0 ? last(events).id : 0;
    });
}

function* poll(endpoint: string, token: string, invoiceID: string): Iterator<CallEffect | PollResult> {
    let lastEventID = yield call(getLastEventID);
    let events: Event[] = [];
    let lastEvent = null;
    while (!isStop(lastEvent)) {
        yield call(delay, 1000);
        const chunk = yield call(getInvoiceEvents, endpoint, token, invoiceID, 5, lastEventID);
        events = events.concat(chunk);
        lastEvent = last(events);
        lastEventID = lastEvent ? lastEvent.id : lastEventID;
    }
    return {
        events: uniqWith(events, (f, s) => f.id === s.id),
        last: lastEvent
    };
}

function* pollWithDelay(endpoint: string, token: string, invoiceID: string): Iterator<RaceEffect | PollResult> {
    const [result, timeout] = yield race<any>([call(poll, endpoint, token, invoiceID), call(delay, 60000)]);
    if (timeout) {
        throw { code: 'error.events.timeout' };
    }
    return result;
}

type Effects = CallEffect | PutEffect<EventPolled> | Event;

export function* pollInvoiceEvents(endpoint: string, token: string, invoiceID: string): Iterator<Effects> {
    const result = yield call(pollWithDelay, endpoint, token, invoiceID);
    yield put({
        type: TypeKeys.EVENTS_POLLED,
        payload: result.events
    } as EventPolled);
    return result.last;
}
