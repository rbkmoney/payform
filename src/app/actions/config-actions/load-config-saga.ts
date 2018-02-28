import { all, AllEffect, call, put, PutEffect } from 'redux-saga/effects';
import { getAppConfig, getLocale } from 'checkout/backend';
import { TypeKeys } from 'checkout/actions';
import { SetConfigChunk } from './load-config-action';

type SagaEffect = AllEffect | PutEffect<SetConfigChunk>;

export function* loadConfig(localeName: string): Iterator<SagaEffect> {
    const [appConfig, locale] = yield all([
        call(getAppConfig),
        call(getLocale, localeName)
    ]);
    yield put({
        type: TypeKeys.SET_CONFIG_CHUNK,
        payload: {
            appConfig,
            locale
        }
    });
}
