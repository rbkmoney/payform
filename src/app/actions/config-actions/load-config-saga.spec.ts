import { all, call, put } from 'redux-saga/effects';
import { loadConfig } from './load-config-saga';
import { getAppConfig, getLocale } from 'checkout/backend';
import { TypeKeys } from 'checkout/actions';

describe('should load config', () => {
    const localeName = 'ru';
    const iterator = loadConfig(localeName);

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
