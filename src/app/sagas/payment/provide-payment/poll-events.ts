import last from 'lodash-es/last';
import { delay } from 'redux-saga';
import { call, CallEffect, put, PutEffect } from 'redux-saga/effects';
import {
    InvoiceChangeType,
    Event,
    getInvoiceEvents
} from 'checkout/backend';
import { getLastChange } from 'checkout/utils';
import { EventPolled, TypeKeys } from 'checkout/actions';

const isStop = (events: Event[]): boolean => {
    const change = getLastChange(events);
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

function* poll(endpoint: string, token: string, invoiceID: string, lastEvents?: Event[]): Iterator<CallEffect | Event[]> {
    let events = [];
    let retryCount = 0;
    const maxRetries = 60;
    while (!isStop(events)) {
        yield call(delay, 300);
        const lastEventID = lastEvents ? last(lastEvents).id : 0;
        events = yield call(getInvoiceEvents, endpoint, token, invoiceID, 10, lastEventID);
        retryCount++;
        if (retryCount >= maxRetries) {
            throw {code: 'error.events.timeout'};
        }
    }
    return events;
}

type Effects = CallEffect | PutEffect<EventPolled> | Event;

export function* pollEvents(endpoint: string, token: string, invoiceID: string, lastEvents?: Event[]): Iterator<Effects> {
    const events = yield call(poll, endpoint, token, invoiceID, lastEvents);
    yield put({
        type: TypeKeys.EVENT_POLLED,
        payload: events
    } as EventPolled);
    return last(events);
}
