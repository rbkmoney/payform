import {
    call,
    CallEffect,
    ForkEffect,
    put,
    PutEffect,
    select,
    SelectEffect,
    takeLatest
} from 'redux-saga/effects';
import {
    InitConfigChecked,
    InitializeAppFailed,
    InitializeAppRequested,
    InitializeModalCompleted,
    TypeKeys,
    InitializeAppCompleted
} from 'checkout/actions';
import { loadConfig } from './load-config';
import { State } from 'checkout/state';
import { initializeModel } from './initialize-model';
import { checkInitConfigCapability } from './check-init-config';
import { initializeModal } from './initialize-modal';
import { initializeAvailablePaymentMethods } from './initialize-available-payment-methods';

type InitializeAppPutEffect =
    InitConfigChecked |
    InitializeModalCompleted |
    InitializeAppCompleted |
    InitializeAppFailed;

export type InitializeAppEffect =
    CallEffect |
    SelectEffect |
    PutEffect<InitializeAppPutEffect>;

export function* initializeApp(action: InitializeAppRequested): Iterator<InitializeAppEffect> {
    try {
        yield call(loadConfig, action.payload.locale);
        const endpoint = yield select((state: State) => state.config.appConfig.capiEndpoint);
        yield call(initializeModel, endpoint, action.payload);
        const model = yield select((state: State) => state.model);

        const checkedInitConfig = yield call(checkInitConfigCapability, action.payload, model);
        yield put({
            type: TypeKeys.INIT_CONFIG_CHECKED,
            payload: checkedInitConfig
        } as InitConfigChecked);

        const config = yield select((state: State) => state.config);
        yield call(initializeAvailablePaymentMethods, model.paymentMethods, config);

        const methods = yield select((state: State) => state.availablePaymentMethods);
        const modal = yield call(initializeModal, action.payload, model, methods);
        yield put({
            type: TypeKeys.INITIALIZE_MODAL_COMPLETED,
            payload: modal
        } as InitializeModalCompleted);

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
