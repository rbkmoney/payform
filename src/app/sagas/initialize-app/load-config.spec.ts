import { all, call, put } from 'redux-saga/effects';
import { getAppConfig, getLocale } from 'checkout/backend';
import { TypeKeys } from 'checkout/actions';
import { loadConfig } from './load-config';

describe('loadConfig', () => {
    const localeName = 'ru';
    const iterator = loadConfig(localeName);

    it('should fetch app config and locale', () => {
        const actual = iterator.next().value;
        const expected = all([
            call(getAppConfig),
            call(getLocale, localeName)
        ]);
        expect(actual).toEqual(expected);
    });

    it('should put config', () => {
        const appConfig = {};
        const locale = {};
        const actual = iterator.next([appConfig, locale]).value;
        const expected = put({
            type: TypeKeys.SET_CONFIG_CHUNK,
            payload: {appConfig, locale}
        });
        expect(actual).toEqual(expected);
    });

    it('should put error', () => {
        const error = {};
        const actual = iterator.throw(error).value;
        const expected = put({
            type: TypeKeys.SET_ERROR,
            payload: error
        });
        expect(actual).toEqual(expected);
    });
});
