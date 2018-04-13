import { call, put, select, takeLatest } from 'redux-saga/effects';
import { TypeKeys, InitializeAppRequested } from 'checkout/actions';
import { watchInitializeApp, initializeApp } from './initialize-app';
import { loadConfig } from './load-config';
import { initializeModel } from './initialize-model';
import { checkInitConfigCapability } from './check-init-config';
import { initializeModal } from './initialize-modal';
import { initializeAvailablePaymentMethods } from './initialize-available-payment-methods';

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
    const model = {
        paymentMethods: 'paymentMethods mock'
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

    it('should call checkInitConfigCapability', () => {
        const actual = iterator.next(model).value;
        const expected = call(checkInitConfigCapability, initConfig, model);
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

    it('should select config', () => {
        const actual = iterator.next().value;
        const expected = select();
        expect(actual.toString()).toEqual(expected.toString());
    });

    it('should call initializeAvailablePaymentMethods', () => {
        const config = 'configMock' as any;
        const actual = iterator.next(config).value;
        const expected = call(initializeAvailablePaymentMethods, model.paymentMethods, config);
        expect(actual).toEqual(expected);
    });

    it('should select availablePaymentMethods', () => {
        const actual = iterator.next().value;
        const expected = select();
        expect(actual.toString()).toEqual(expected.toString());
    });

    it('should call initializeModal', () => {
        const availablePaymentMethods = 'availablePaymentMethodsMock' as any;
        const actual = iterator.next(availablePaymentMethods).value;
        const expected = call(initializeModal, initConfig, model, availablePaymentMethods);
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
