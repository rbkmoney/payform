import { all, AllEffect, call, put, PutEffect } from 'redux-saga/effects';
import { getAppConfig, getLocale } from '../../backend';
import { SetConfigChunk, SetErrorAction, TypeKeys } from 'checkout/actions';

type LoadConfigEffect = AllEffect | PutEffect<SetConfigChunk> | PutEffect<SetErrorAction>;

export function* loadConfig(localeName: string): IterableIterator<LoadConfigEffect> {
    try {
        const [appConfig, locale] = yield all([
            call(getAppConfig),
            call(getLocale, localeName)
        ]);
        yield put({
            type: TypeKeys.SET_CONFIG_CHUNK, // TODO TypeKeys.CONFIG_CHUNK_RECEIVED
            payload: {
                appConfig,
                locale
            }
        } as SetConfigChunk);
    } catch (error) {
        yield put({type: TypeKeys.SET_ERROR, payload: error} as SetErrorAction);
    }
}
