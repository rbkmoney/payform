import { all, call, put, select } from 'redux-saga/effects';
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
            type: TypeKeys.CONFIG_CHUNK_RECEIVED,
            payload: {appConfig, locale}
        });
        expect(actual).toEqual(expected);
    });

    it('should select config', () => {
        const actual = iterator.next().value;
        const expected = select();
        expect(actual.toString()).toEqual(expected.toString());
    });
});
