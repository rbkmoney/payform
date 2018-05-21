import { call, put, select, takeLatest } from 'redux-saga/effects';
import { TypeKeys, InitializeAppRequested } from 'checkout/actions';
import { watchInitializeApp, initializeApp } from './initialize-app';
import { loadConfig } from './load-config';
import { initializeModel } from './initialize-model';
import { checkInitConfig } from './check-init-config';
import { initializeModal } from './initialize-modal';
import { initializeAmountConfig } from './initialize-amount-config';

it('watchInitializeApp should takeLatest initializeApp', () => {
    const iterator = watchInitializeApp();
    const actual = iterator.next().value;
    const expected = takeLatest(TypeKeys.INITIALIZE_APP_REQUESTED, initializeApp);
    expect(actual).toEqual(expected);
});

describe('initializeApp', () => {
    const initConfig = {
        locale: 'localeMock'
    };
    const action = {
        type: TypeKeys.INITIALIZE_APP_REQUESTED,
        payload: initConfig
    } as InitializeAppRequested;
    const model = 'modelMock' as any;
    const config = {
        initConfig: 'initConfigMock'
    } as any;

    const iterator = initializeApp(action);

    it('should call loadConfig', () => {
        const actual = iterator.next().value;
        const expected = call(loadConfig, initConfig.locale);
        expect(actual).toEqual(expected);
    });

    it('should select endpoint', () => {
        const actual = iterator.next().value;
        const expected = select();
        expect(actual.toString()).toEqual(expected.toString());
    });

    it('should call initializeModel', () => {
        const endpoint = 'mockEndpoint';
        const actual = iterator.next(endpoint).value;
        const expected = call(initializeModel, endpoint, initConfig);
        expect(actual).toEqual(expected);
    });

    it('should select model', () => {
        const actual = iterator.next().value;
        const expected = select();
        expect(actual.toString()).toEqual(expected.toString());
    });

    it('should call checkInitConfig', () => {
        const actual = iterator.next(model).value;
        const expected = call(checkInitConfig, initConfig, model);
        expect(actual).toEqual(expected);
    });

    it('should select config', () => {
        const actual = iterator.next().value;
        const expected = select();
        expect(actual.toString()).toEqual(expected.toString());
    });

    it('should call initializeAmountConfig', () => {
        const actual = iterator.next(config).value;
        const expected = call(initializeAmountConfig, config.initConfig, model);
        expect(actual).toEqual(expected);
    });

    it('should call initializeModal', () => {
        // const config = 'configMock' as any;
        const actual = iterator.next().value;
        const expected = call(initializeModal, config, model);
        expect(actual).toEqual(expected);
    });

    it('should put initialize app completed', () => {
        const actual = iterator.next().value;
        const expected = put({
            type: TypeKeys.INITIALIZE_APP_COMPLETED,
        });
        expect(actual).toEqual(expected);
    });

    it('should put initialize app failed', () => {
        const error = {};
        const actual = iterator.throw(error).value;
        const expected = put({
            type: TypeKeys.INITIALIZE_APP_FAILED,
            payload: error
        });
        expect(actual).toEqual(expected);
    });
});
