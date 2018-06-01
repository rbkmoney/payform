import { call, put, takeLatest } from 'redux-saga/effects';
import { TypeKeys, InitializeAppRequested } from 'checkout/actions';
import { watchInitializeApp, initializeApp, initialize } from './initialize-app';
import { loadConfig } from './load-config';
import { initializeModel } from './initialize-model';
import { checkInitConfig } from './check-init-config';
import { initializeModal } from './initialize-modal';
import { initializeAmountInfo } from './initialize-amount-info';
import { initializeAvailablePaymentMethods } from './initialize-available-payment-methods';

it('watchInitializeApp should takeLatest initializeApp', () => {
    const iterator = watchInitializeApp();
    const actual = iterator.next().value;
    const expected = takeLatest(TypeKeys.INITIALIZE_APP_REQUESTED, initializeApp);
    expect(actual).toEqual(expected);
});

describe('initialize', () => {
    const userInitConfig = {
        locale: 'localeMock'
    } as any;
    const initConfig = 'initConfigMock' as any;
    const model = {
        paymentMethods: 'paymentMethodsMock'
    } as any;
    const configChunk = {
        appConfig: {
            capiEndpoint: 'capiEndpointMock'
        }
    } as any;

    const iterator = initialize(userInitConfig);

    it('should call loadConfig', () => {
        const actual = iterator.next().value;
        const expected = call(loadConfig, userInitConfig.locale);
        expect(actual).toEqual(expected);
    });

    it('should call initializeModel', () => {
        const actual = iterator.next(configChunk).value;
        const expected = call(initializeModel, configChunk.appConfig.capiEndpoint, userInitConfig);
        expect(actual).toEqual(expected);
    });

    it('should call checkInitConfig', () => {
        const actual = iterator.next(model).value;
        const expected = call(checkInitConfig, userInitConfig, model);
        expect(actual).toEqual(expected);
    });

    it('should call initializeAmountInfo', () => {
        const actual = iterator.next(initConfig).value;
        const expected = call(initializeAmountInfo, initConfig, model);
        expect(actual).toEqual(expected);
    });

    it('should call initializeAvailablePaymentMethods', () => {
        const amountInfo = 'amountInfoMock' as any;
        const actual = iterator.next(amountInfo).value;
        const expected = call(initializeAvailablePaymentMethods, {...configChunk, initConfig}, model.paymentMethods, amountInfo);
        expect(actual).toEqual(expected);
    });

    it('should call initializeModal', () => {
        const methods = 'methodsMock' as any;
        const actual = iterator.next(methods).value;
        const expected = call(initializeModal, initConfig, model, methods);
        expect(actual).toEqual(expected);
    });
});

describe('initializeApp', () => {
    const action = {
        type: TypeKeys.INITIALIZE_APP_REQUESTED,
        payload: {
            locale: 'localeMock'
        }
    } as InitializeAppRequested;
    const iterator = initializeApp(action);

    it('should call initialize', () => {
        const actual = iterator.next().value;
        const expected = call(initialize, action.payload);
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
