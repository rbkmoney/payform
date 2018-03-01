import { all } from 'redux-saga/effects';
import { initializeAppSaga } from './initialize-app';

export default function* rootSaga() {
    yield all([
        initializeAppSaga()
    ]);
}
