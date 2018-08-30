import { last } from 'lodash-es';
import { delay } from 'redux-saga';
import { call, CallEffect, put, PutEffect, race, RaceEffect, select, SelectEffect } from 'redux-saga/effects';
import { Event, getInvoiceEvents, InvoiceChangeType } from 'checkout/backend';
import { SetEventsAction, TypeKeys } from 'checkout/actions';
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

function* getLastEventID(): Iterator<SelectEffect | number> {
    return yield select(
        ({ events: { invoiceEvents: events } }: State) => (events && events.length > 0 ? last(events).id : 0)
    );
}

function* poll(
    endpoint: string,
    token: string,
    invoiceID: string
): Iterator<CallEffect | Event | PutEffect<SetEventsAction>> {
    let lastEventID = yield call(getLastEventID);
    let lastEvent = null;
    while (!isStop(lastEvent)) {
        yield call(delay, 1000);
        const chunk: Event[] = yield call(getInvoiceEvents, endpoint, token, invoiceID, 5, lastEventID);
        yield put({
            type: TypeKeys.EVENTS_POLLING,
            payload: chunk
        } as SetEventsAction);
        lastEvent = last(chunk);
        lastEventID = lastEvent ? lastEvent.id : lastEventID;
    }
    return lastEvent;
}

export function* pollInvoiceEvents(
    endpoint: string,
    token: string,
    invoiceID: string
): Iterator<PutEffect<SetEventsAction> | RaceEffect> {
    const [result] = yield race<any>([call(poll, endpoint, token, invoiceID), call(delay, 60000)]);
    if (result) {
        return yield put({
            type: TypeKeys.EVENTS_POLLED
        } as SetEventsAction);
    }
    return yield put({
        type: TypeKeys.EVENTS_POLLING_TIMEOUT
    } as SetEventsAction);
}
