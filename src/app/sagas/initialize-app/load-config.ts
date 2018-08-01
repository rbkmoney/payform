import { all, AllEffect, call, put, PutEffect, select, SelectEffect } from 'redux-saga/effects';
import { getAppConfig, getLocale } from '../../backend';
import { ConfigChunk, ConfigChunkReceived, TypeKeys } from 'checkout/actions';
import { State } from 'checkout/state';

type LoadConfigEffect = AllEffect | PutEffect<ConfigChunkReceived> | SelectEffect | ConfigChunk;

export function* loadConfig(localeName: string): IterableIterator<LoadConfigEffect> {
    const [appConfig, locale] = yield all([call(getAppConfig), call(getLocale, localeName)]);
    yield put({
        type: TypeKeys.CONFIG_CHUNK_RECEIVED,
        payload: {
            appConfig,
            locale
        }
    } as ConfigChunkReceived);
    return yield select((state: State) => state.config);
}
