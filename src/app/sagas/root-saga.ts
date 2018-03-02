import { all } from 'redux-saga/effects';
import { watchInitializeApp } from './initialize-app';

export default function* rootSaga() {
    yield all([
        watchInitializeApp()
    ]);
}
