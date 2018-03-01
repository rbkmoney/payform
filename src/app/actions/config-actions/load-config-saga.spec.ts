import { all, call, put, takeLatest } from 'redux-saga/effects';
import { loadConfig, loadConfigSaga } from './load-config-saga';
import { getAppConfig, getLocale } from 'checkout/backend';
import { TypeKeys } from 'checkout/actions';

describe('loadConfig', () => {
    const localeName = 'ru';
    const iterator = loadConfig({
        type: TypeKeys.LOAD_CONFIG_REQUESTED,
        payload: localeName
    });

    it('should call app and locale fetching', () => {
        const actual = iterator.next().value;
        const expected = all([
            call(getAppConfig),
            call(getLocale, localeName)
        ]);
        expect(actual).toEqual(expected);
    });

    it('should put action', () => {
        const appConfig = {};
        const locale = {};
        const actual = iterator.next([appConfig, locale]).value;
        const expected = put({
            type: TypeKeys.SET_CONFIG_CHUNK,
            payload: {appConfig, locale}
        });
        expect(actual).toEqual(expected);
    });
});

it('loadConfigSaga should takeLatest loadConfig', () => {
    const iterator = loadConfigSaga();
    const actual = iterator.next().value;
    const expected = takeLatest(TypeKeys.LOAD_CONFIG_REQUESTED, loadConfig);
    expect(actual).toEqual(expected);
});
