import { all } from 'redux-saga/effects';
import { watchInitializeApp } from './initialize-app';
import { watchPayment } from './payment';
import { watchSubscription } from './subscription';

export default function* rootSaga() {
    yield all([
        watchInitializeApp(),
        watchPayment(),
        watchSubscription()
    ]);
}
