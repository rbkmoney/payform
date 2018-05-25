import {
    call,
    CallEffect,
    ForkEffect,
    put,
    PutEffect,
    takeLatest
} from 'redux-saga/effects';
import {
    TypeKeys,
    InitializeAppFailed,
    InitializeAppRequested,
    InitializeAppCompleted
} from 'checkout/actions';
import { InitConfig } from 'checkout/config';
import { loadConfig } from './load-config';
import { initializeModel } from './initialize-model';
import { checkInitConfig } from './check-init-config';
import { initializeModal } from './initialize-modal';
import { initializeAmountConfig } from './initialize-amount-config';
import { initializeAvailablePaymentMethods } from './initialize-available-payment-methods';

type InitializeAppPutEffect =
    InitializeAppCompleted |
    InitializeAppFailed;

export type InitializeAppEffect =
    CallEffect |
    PutEffect<InitializeAppPutEffect>;

export function* initialize(userInitConfig: InitConfig): Iterator<CallEffect> {
    const configChunk = yield call(loadConfig, userInitConfig.locale);
    const model = yield call(initializeModel, configChunk.appConfig.capiEndpoint, userInitConfig);
    const initConfig = yield call(checkInitConfig, userInitConfig, model);
    const amountInfo = yield call(initializeAmountConfig, initConfig, model);
    const methods = yield call(initializeAvailablePaymentMethods, {...configChunk, initConfig}, model.paymentMethods, amountInfo);
    yield call(initializeModal, initConfig, model, methods);
}

export function* initializeApp(action: InitializeAppRequested): Iterator<InitializeAppEffect> {
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

export function* watchInitializeApp(): Iterator<ForkEffect> {
    yield takeLatest(TypeKeys.INITIALIZE_APP_REQUESTED, initializeApp);
}
