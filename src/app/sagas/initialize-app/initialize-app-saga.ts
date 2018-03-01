import { call, ForkEffect, put, select, takeLatest } from 'redux-saga/effects';
import { InitializeAppRequested, TypeKeys } from 'checkout/actions';
import { loadConfig } from './load-config';
import { State } from 'checkout/state';
import { initializeModel } from './initialize-model';
import { checkInitConfigCapability } from './check-init-config';
import { initializeModal } from './initialize-modal';

export function* initialize(action: InitializeAppRequested): Iterator<any> {
    yield call(loadConfig, action.payload.locale);
    const endpoint = yield select((state: State) => state.config.appConfig.capiEndpoint);
    yield call(initializeModel, endpoint, action.payload);
    const model = yield select((state: State) => state.model);
    yield put({
        type: TypeKeys.SET_CHECKED_INIT_CONFIG,
        payload: checkInitConfigCapability(action.payload, model)
    });
    yield put({
        type: TypeKeys.SET_MODAL_STATE,
        payload: initializeModal(action.payload, model)
    });
}

export function* initializeAppSaga(): Iterator<ForkEffect> {
    yield takeLatest(TypeKeys.INITIALIZE_APP_REQUESTED, initialize);
}
