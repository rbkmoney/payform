import last from 'lodash-es/last';
import { delay } from 'redux-saga';
import { call } from 'redux-saga/effects';
import {
    InvoiceChangeType,
    Event,
    getInvoiceEvents
} from 'checkout/backend';
import { getLastChange } from 'checkout/utils';

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

export function* pollEvents(endpoint: string, token: string, invoiceID: string, lastEvents?: Event[]) {
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
