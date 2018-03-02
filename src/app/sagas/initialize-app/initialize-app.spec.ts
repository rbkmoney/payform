import { call, put, select, takeLatest } from 'redux-saga/effects';
import { TypeKeys, InitializeAppRequested } from 'checkout/actions';
import { watchInitializeApp, initializeApp } from './initialize-app';
import { loadConfig } from './load-config';
import { initializeModel } from 'checkout/sagas/initialize-app/initialize-model';
import { checkInitConfigCapability } from 'checkout/sagas/initialize-app/check-init-config';
import { initializeModal } from 'checkout/sagas/initialize-app/initialize-modal';

it('watchInitializeApp should takeLatest initializeApp', () => {
    const iterator = watchInitializeApp();
    const actual = iterator.next().value;
    const expected = takeLatest(TypeKeys.INITIALIZE_APP_REQUESTED, initializeApp);
    expect(actual).toEqual(expected);
});

describe('initializeApp', () => {
    const initConfigMock = {locale: 'localeMock'};
    const action = {
        type: TypeKeys.INITIALIZE_APP_REQUESTED,
        payload: initConfigMock
    } as InitializeAppRequested;
    const iterator = initializeApp(action);

    it('should call loadConfig', () => {
        const actual = iterator.next().value;
        const expected = call(loadConfig, initConfigMock.locale);
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
        const expected = call(initializeModel, endpoint, initConfigMock);
        expect(actual).toEqual(expected);
    });

    it('should select model', () => {
        const actual = iterator.next().value;
        const expected = select();
        expect(actual.toString()).toEqual(expected.toString());
    });

    it('should call checkInitConfigCapability', () => {
        const model = {};
        const actual = iterator.next(model).value;
        const expected = call(checkInitConfigCapability, initConfigMock, model);
        expect(actual).toEqual(expected);
    });

    it('should put checked init config', () => {
        const checkedInitConfig = {};
        const actual = iterator.next(checkedInitConfig).value;
        const expected = put({
            type: TypeKeys.INIT_CONFIG_CHECKED,
            payload: checkedInitConfig
        });
        expect(actual).toEqual(expected);
    });

    it('should call initializeModal', () => {
        const modal = {};
        const actual = iterator.next(modal).value;
        const expected = call(initializeModal, initConfigMock, modal);
        expect(actual).toEqual(expected);
    });

    it('should put modal', () => {
        const modal = {};
        const actual = iterator.next(modal).value;
        const expected = put({
            type: TypeKeys.INITIALIZE_MODAL_COMPLETED,
            payload: modal
        });
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
