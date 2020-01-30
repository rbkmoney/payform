import { put, call, takeLatest } from 'redux-saga/effects';
import { TypeKeys, InitializeAppFailed, InitializeAppRequested, InitializeAppCompleted } from 'checkout/actions';
import { InitConfig } from 'checkout/config';
import { loadConfig } from './load-config';
import { checkInitConfig } from './check-init-config';
import { initializeModel } from './initialize-model';
import { initializeModal } from './initialize-modal';
import { initializeAmountInfo } from './initialize-amount-info';
import { initializeAvailablePaymentMethods } from './initialize-available-payment-methods';

export function* initialize(userInitConfig: InitConfig) {
    const configChunk = yield call(loadConfig, userInitConfig.locale);
    const { model, events } = yield call(initializeModel, configChunk.appConfig.capiEndpoint, userInitConfig);
    const initConfig = yield call(checkInitConfig, userInitConfig, model);
    const amountInfo = yield call(initializeAmountInfo, initConfig, model);
    const methods = yield call(
        initializeAvailablePaymentMethods,
        { ...configChunk, initConfig },
        model.paymentMethods,
        amountInfo
    );
    yield call(initializeModal, initConfig, events, methods);
}

export function* initializeApp(action: InitializeAppRequested) {
    try {
        yield call(initialize, action.payload);
        yield put({
            type: TypeKeys.INITIALIZE_APP_COMPLETED
        } as InitializeAppCompleted);
    } catch (error) {
        yield put({
            type: TypeKeys.INITIALIZE_APP_FAILED,
            payload: error
        } as InitializeAppFailed);
    }
}

export function* watchInitializeApp() {
    yield takeLatest(TypeKeys.INITIALIZE_APP_REQUESTED, initializeApp);
}
