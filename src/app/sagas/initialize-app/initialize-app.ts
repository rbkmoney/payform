import { put, call, CallEffect, ForkEffect, PutEffect, takeLatest } from 'redux-saga/effects';
import { TypeKeys, InitializeAppFailed, InitializeAppRequested, InitializeAppCompleted } from 'checkout/actions';
import { InitConfig } from 'checkout/config';
import { loadConfig } from './load-config';
import { checkInitConfig } from './check-init-config';
import { initializeModel } from './initialize-model';
import { initializeModal } from './initialize-modal';
import { initializeAmountInfo } from './initialize-amount-info';
import { initializeAvailablePaymentMethods } from './initialize-available-payment-methods';
import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';

type InitializeAppPutEffect = InitializeAppCompleted | InitializeAppFailed;

export type InitializeAppEffect = CallEffect | PutEffect<InitializeAppPutEffect>;

export function* initialize(userInitConfig: InitConfig): Iterator<CallEffect> {
    const configChunk = yield call(loadConfig, userInitConfig.locale);
    Sentry.init({
        dsn: configChunk.appConfig.sentryDsn,
        integrations: [new Integrations.BrowserTracing()],

        // We recommend adjusting this value in production, or using tracesSampler
        // for finer control
        tracesSampleRate: 1.0
    });
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
