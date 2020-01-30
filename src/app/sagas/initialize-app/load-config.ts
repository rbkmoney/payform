import { all, call, put, select } from 'redux-saga/effects';
import { getAppConfig, getLocale } from '../../backend';
import { ConfigChunkReceived, TypeKeys } from 'checkout/actions';
import { State } from 'checkout/state';

export function* loadConfig(localeName: string) {
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
