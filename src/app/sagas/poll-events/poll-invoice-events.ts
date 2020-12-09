import last from 'lodash-es/last';
import { delay } from 'redux-saga';
import { call, put, race, select, CallEffect, PutEffect, RaceEffect, SelectEffect } from 'redux-saga/effects';
import { InvoiceEvent, getInvoiceEvents, InvoiceChangeType, InteractionType } from 'checkout/backend';
import { SetEventsAction, TypeKeys } from 'checkout/actions';
import { State } from 'checkout/state';
import { provideFromInvoiceEvent } from '../provide-modal';
import get from 'lodash-es/get';

const isStop = (event: InvoiceEvent): boolean => {
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
    return yield select(({ events: { events: events } }: State) => (events && events.length > 0 ? last(events).id : 0));
}

function* poll(
    endpoint: string,
    token: string,
    invoiceID: string,
    interval = 1000
): Iterator<CallEffect | InvoiceEvent | PutEffect<SetEventsAction> | boolean> {
    let lastEventID = yield call(getLastEventID);
    let lastEvent = null;
    while (!isStop(lastEvent)) {
        yield call(delay, interval);
        const chunk: InvoiceEvent[] = yield call(getInvoiceEvents, endpoint, token, invoiceID, 5, lastEventID);
        yield put({
            type: TypeKeys.EVENTS_POLLING,
            payload: chunk
        } as SetEventsAction);
        lastEvent = last(chunk);
        lastEventID = lastEvent ? lastEvent.id : lastEventID;
    }
    return lastEvent;
}

function isEventToWait(event: InvoiceEvent): boolean {
    return (
        event &&
        get(last(event.changes), ['userInteraction', 'interactionType']) === InteractionType.QrCodeDisplayRequest
    );
}

export function* pollInvoiceEvents(
    endpoint: string,
    token: string,
    invoiceID: string
): Iterator<RaceEffect | PutEffect<SetEventsAction> | CallEffect> {
    let [result] = yield race<any>([call(poll, endpoint, token, invoiceID), call(delay, 60000)]);
    if (isEventToWait(result)) {
        yield call(provideFromInvoiceEvent, result);
        [result] = yield race<any>([call(poll, endpoint, token, invoiceID, 5000), call(delay, 600000)]);
    }
    if (result) {
        return yield put({
            type: TypeKeys.EVENTS_POLLED
        } as SetEventsAction);
    }
    return yield put({
        type: TypeKeys.EVENTS_POLLING_TIMEOUT
    } as SetEventsAction);
}
