import { call, put } from 'redux-saga/effects';
import { cloneableGenerator } from 'redux-saga/utils';
import { SagaIterator } from 'redux-saga';
import { makePayment } from './make-payment';
import { getPayableInvoice } from './get-payable-invoice';
import { createPayment, LogicErrorCode } from 'checkout/backend';
import { SetAcceptedError } from 'checkout/actions/error-actions/set-accepted-error';
import { TypeKeys } from 'checkout/actions';
import { pollInvoiceEvents } from 'checkout/sagas/poll-events';

describe('makePayment', () => {
    const endpoint = 'http://test.endpoint';
    const c = {
        initConfig: 'initConfigMock',
        appConfig: {
            capiEndpoint: endpoint
        }
    } as any;
    const { initConfig, appConfig } = c;
    const { capiEndpoint } = appConfig;
    const token = 'invoiceAccessTokenMock';
    const id = 'idMock';
    const params = {
        invoice: { id },
        invoiceAccessToken: token
    } as any;

    const m = 'ModelStateMock' as any;
    const a = 'AmountInfoStateMock' as any;
    const v = { amount: 'amountMock', mail: 'mailMock' } as any;
    const fn = () => [] as any;
    const gen = cloneableGenerator(() => makePayment(c, m, a, v, fn) as SagaIterator)();

    it('should call getPayableInvoice', () => {
        const actual = gen.next().value;
        const expected = call(getPayableInvoice, initConfig, capiEndpoint, m, a, v.amount);
        expect(actual.toString()).toEqual(expected.toString());
    });

    it('should call createPaymentResourceFn', () => {
        const actual = gen.next(params).value;
        const expected = call(fn, token);
        expect(actual.toString()).toEqual(expected.toString());
    });

    it('should call createPayment', () => {
        const paymentResource = 'paymentResourceMock' as any;
        const actual = gen.next(paymentResource).value;
        const expected = call(createPayment, capiEndpoint, token, id, v.email, paymentResource, initConfig);
        expect(actual.toString()).toEqual(expected.toString());
    });

    it('should get logic error', () => {
        const clone = gen.clone();
        const error = { code: LogicErrorCode.invalidInvoiceStatus };
        const actual = clone.throw(error).value;
        const expected = put<SetAcceptedError>({ type: TypeKeys.SET_ACCEPTED_ERROR, payload: error });
        expect(actual).toEqual(expected);
    });

    it('should get untyped error', () => {
        const clone = gen.clone();
        const error = { code: LogicErrorCode.operationNotPermitted };
        let actual;
        try {
            actual = clone.throw(error).value;
        } catch (e) {
            actual = e;
        }
        expect(actual).toEqual(error);
    });

    it('should call pollInvoiceEvents', () => {
        const actual = gen.next().value;
        const expected = call(pollInvoiceEvents, capiEndpoint, token, id);
        expect(actual).toEqual(expected);
    });
});
