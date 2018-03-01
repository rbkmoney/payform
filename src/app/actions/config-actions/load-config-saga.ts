import { all, AllEffect, call, ForkEffect, put, PutEffect, takeLatest } from 'redux-saga/effects';
import { getAppConfig, getLocale } from 'checkout/backend';
import { AbstractAction, TypeKeys } from 'checkout/actions';
import { SetConfigChunk } from './load-config-action';

type SagaEffect = AllEffect | PutEffect<SetConfigChunk>;

export function* loadConfig(action: LoadConfigRequested): Iterator<SagaEffect> {
    const [appConfig, locale] = yield all([
        call(getAppConfig),
        call(getLocale, action.payload)
    ]);
    yield put({
        type: TypeKeys.SET_CONFIG_CHUNK,
        payload: {
            appConfig,
            locale
        }
    } as SetConfigChunk);
}

export interface LoadConfigRequested extends AbstractAction<string> {
    type: TypeKeys.LOAD_CONFIG_REQUESTED;
    payload: string;
}

export const loadConfigAction = (localeName: string): LoadConfigRequested => ({
    type: TypeKeys.LOAD_CONFIG_REQUESTED,
    payload: localeName
});

export function* loadConfigSaga(): Iterator<ForkEffect> {
    yield takeLatest(TypeKeys.LOAD_CONFIG_REQUESTED, loadConfig);
}
