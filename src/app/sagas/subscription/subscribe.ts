import { call, ForkEffect, put, select, takeLatest } from 'redux-saga/effects';
import {
    PrepareToPay,
    SubscriptionCompleted,
    SubscriptionRequested,
    TypeKeys
} from 'checkout/actions';
import { State } from 'checkout/state';
import { provideSubscription } from './provide-subscription';
import { provideModal } from './provide-modal';

export function* subscribe(action: SubscriptionRequested) {
    try {
        const {config, model} = yield select((s: State) => ({config: s.config, model: s.model}));
        yield put({type: TypeKeys.PREPARE_TO_PAY} as PrepareToPay);
        const event = yield call(provideSubscription, config, model, action.payload);
        yield call(provideModal, event);
        yield put({type: TypeKeys.SUBSCRIPTION_COMPLETED} as SubscriptionCompleted);
    } catch (error) {
        console.error(error);
        yield put({
            type: TypeKeys.SUBSCRIPTION_FAILED,
            payload: error
        });
    }
}

export function* watchSubscription(): Iterator<ForkEffect> {
    yield takeLatest(TypeKeys.SUBSCRIPTION_REQUESTED, subscribe);
}
