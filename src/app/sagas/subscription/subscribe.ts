import { CallEffect, ForkEffect, PutEffect, SelectEffect, put, call, select, takeLatest } from 'redux-saga/effects';
import { last } from 'lodash-es';
import {
    PrepareToPay,
    TypeKeys,
    SubscriptionRequested,
    SubscriptionCompleted,
    SubscriptionFailed,
    goToFormInfo,
    GoToFormInfo
} from 'checkout/actions';
import { EventsStatus, ResultFormInfo, ResultType, State } from 'checkout/state';
import { provideSubscription } from './provide-subscription';
import { provideFromCustomerEvent } from '../provide-modal';

type SubscribePutEffect = PrepareToPay | SubscriptionCompleted | SubscriptionFailed;

type SubscribeEffect = SelectEffect | CallEffect | PutEffect<SubscribePutEffect | GoToFormInfo>;

export function* subscribe(action: SubscriptionRequested): Iterator<SubscribeEffect> {
    try {
        const config = yield select((s: State) => s.config);
        yield put({ type: TypeKeys.PREPARE_TO_PAY } as PrepareToPay);
        yield call(provideSubscription, config, action.payload);
        const customerEventsStatus = yield select((state: State) => state.events.customerEventsStatus);
        switch (customerEventsStatus) {
            case EventsStatus.polled:
                const event = yield select((s: State) => last(s.events.customerEvents));
                yield call(provideFromCustomerEvent, event);
                yield put({ type: TypeKeys.SUBSCRIPTION_COMPLETED } as SubscriptionCompleted);
                break;
            case EventsStatus.timeout:
                yield put(goToFormInfo(new ResultFormInfo(ResultType.processed)));
                break;
        }
    } catch (error) {
        yield put({
            type: TypeKeys.SUBSCRIPTION_FAILED,
            payload: error
        } as SubscriptionFailed);
    }
}

export function* watchSubscription(): Iterator<ForkEffect> {
    yield takeLatest(TypeKeys.SUBSCRIPTION_REQUESTED, subscribe);
}
