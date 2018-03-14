import { all, AllEffect, call, put, PutEffect } from 'redux-saga/effects';
import { getAppConfig, getLocale } from '../../backend';
import { ConfigChunkReceived, TypeKeys } from 'checkout/actions';

type LoadConfigEffect = AllEffect | PutEffect<ConfigChunkReceived>;

export function* loadConfig(localeName: string): IterableIterator<LoadConfigEffect> {
    const [appConfig, locale] = yield all([
        call(getAppConfig),
        call(getLocale, localeName)
    ]);
    yield put({
        type: TypeKeys.CONFIG_CHUNK_RECEIVED,
        payload: {
            appConfig,
            locale
        }
    } as ConfigChunkReceived);
}
