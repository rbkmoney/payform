import last from 'lodash-es/last';
import uniqWith from 'lodash-es/uniqWith';
import { delay } from 'redux-saga';
import {
    call,
    select,
    put,
    race,
    CallEffect,
    PutEffect,
    RaceEffect,
    SelectEffect
} from 'redux-saga/effects';
import { getCustomerEvents, CustomerEvent, CustomerChangeType } from 'checkout/backend';
import { CustomerEventPolled, TypeKeys } from 'checkout/actions';
import { State } from 'checkout/state';

const isStop = (event: CustomerEvent): boolean => {
    if (!event || !event.changes) {
        return false;
    }
    const change = last(event.changes);
    if (!change) {
        return false;
    }
    switch (change.changeType) {
        case CustomerChangeType.CustomerBindingStatusChanged:
        case CustomerChangeType.CustomerBindingInteractionRequested:
            return true;
        default:
            return false;
    }
};

interface PollResult {
    events: CustomerEvent[];
    last: CustomerEvent;
}

function* getLastEventID(): Iterator<SelectEffect | number> {
    return yield select((s: State) => {
        const events = s.model.customerEvents;
        return events && events.length > 0 ? last(events).id : 0;
    });
}

function* poll(endpoint: string, token: string, customerID: string): Iterator<CallEffect | PollResult> {
    let lastEventID = yield call(getLastEventID);
    let events: CustomerEvent[] = [];
    let lastEvent = null;
    while (!isStop(lastEvent)) {
        yield call(delay, 1000);
        const chunk = yield call(getCustomerEvents, endpoint, token, customerID, 5, lastEventID);
        events = events.concat(chunk);
        lastEvent = last(events);
        lastEventID = lastEvent.id;
    }
    return {
        events: uniqWith(events, (f, s) => f.id === s.id),
        last: lastEvent
    };
}

function* pollWithDelay(endpoint: string, token: string, customerID: string): Iterator<RaceEffect | PollResult> {
    const [result, timeout] = yield race<any>([
        call(poll, endpoint, token, customerID),
        call(delay, 60000)
    ]);
    if (timeout) {
        throw {code: 'error.events.timeout'};
    }
    return result;
}

type Effects = CallEffect | PutEffect<CustomerEventPolled> | CustomerEvent;

export function* pollCustomerEvents(endpoint: string, token: string, customerID: string): Iterator<Effects> {
    const result = yield call(pollWithDelay, endpoint, token, customerID);
    yield put({
        type: TypeKeys.CUSTOMER_EVENTS_POLLED,
        payload: result.events
    } as CustomerEventPolled);
    return result.last;
}
