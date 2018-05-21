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
import { checkInitConfig } from './check-init-config';
import { initializeModal } from './initialize-modal';
import { initializeAmountConfig } from './initialize-amount-config';

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
        const initConfig = action.payload;
        yield call(loadConfig, initConfig.locale);
        const endpoint = yield select((state: State) => state.config.appConfig.capiEndpoint);
        yield call(initializeModel, endpoint, initConfig);
        const model = yield select((state: State) => state.model);
        yield call(checkInitConfig, initConfig, model);
        const config = yield select((state: State) => state.config);
        yield call(initializeAmountConfig, config.initConfig, model);
        yield call(initializeModal, config, model);
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
