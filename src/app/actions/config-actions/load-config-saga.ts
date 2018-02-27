import { all, call, put } from 'redux-saga/effects';
import { getAppConfig, getLocale } from 'checkout/backend';
import { TypeKeys } from 'checkout/actions';

export function* loadConfig(localeName: string) {
    const [appConfig, locale] = yield all([
        call(getAppConfig),
        call(getLocale, localeName)
    ]);
    yield put({
        type: TypeKeys.SET_CONFIG_CHUNK,
        payload: {appConfig, locale}
    });
}
