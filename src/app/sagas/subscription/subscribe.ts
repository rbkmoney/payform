import { call, CallEffect, ForkEffect, put, PutEffect, select, SelectEffect, takeLatest } from 'redux-saga/effects';
import {
    PrepareToPay,
    SubscriptionCompleted, SubscriptionFailed,
    SubscriptionRequested,
    TypeKeys
} from 'checkout/actions';
import { State } from 'checkout/state';
import { provideSubscription } from './provide-subscription';
import { provideFromCustomerEvent } from '../provide-modal';

type SubscribePutEffect = PrepareToPay | SubscriptionCompleted | SubscriptionFailed;

type SubscribeEffect =
    SelectEffect |
    CallEffect |
    PutEffect<SubscribePutEffect>;

export function* subscribe(action: SubscriptionRequested): Iterator<SubscribeEffect> {
    try {
        const {config, model} = yield select((s: State) => ({config: s.config, model: s.model}));
        yield put({type: TypeKeys.PREPARE_TO_PAY} as PrepareToPay);
        const event = yield call(provideSubscription, config, model, action.payload);
        yield call(provideFromCustomerEvent, event);
        yield put({type: TypeKeys.SUBSCRIPTION_COMPLETED} as SubscriptionCompleted);
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
