import { call, put, takeLatest, select } from 'redux-saga/effects';
import { TypeKeys, PaymentCompleted, PrepareToPay, goToFormInfo } from 'checkout/actions';
import { watchPayment, pay, paymentComplete } from './pay';
import { State, EventsStatus, ResultFormInfo, ResultType } from 'checkout/state';
import last from 'lodash-es/last';
import { provideFromInvoiceEvent } from '../provide-modal';
import { providePayment } from './provide-payment';
import { cloneableGenerator } from 'redux-saga/utils';
import { SagaIterator } from 'redux-saga';

it('watchPayment should takeLatest pay', () => {
    const iterator = watchPayment();
    const actual = iterator.next().value;
    const expected = takeLatest(TypeKeys.PAYMENT_REQUESTED, pay);
    expect(actual).toEqual(expected);
});

describe('pay', () => {
    const action = {
        type: TypeKeys.PAYMENT_REQUESTED,
        payload: {
            method: 'PaymentMethodNameMock'
        }
    } as any;

    const config = 'config' as any;
    const model = {
        paymentMethods: 'paymentMethodsMock'
    } as any;
    const amountInfo = 'amountInfo' as any;
    const FullState = { config, model, amountInfo } as any;

    const { values, method } = action.payload;

    const gen = cloneableGenerator(() => pay(action) as SagaIterator)();

    it('should select config, model, amountInfo', () => {
        const actual = gen.next().value;
        const expected = select((s: State) => ({
            config: s.config,
            model: s.model,
            amountInfo: s.amountInfo
        }));
        expect(actual.toString()).toEqual(expected.toString());
    });

    it('should put prepare to pay', () => {
        const actual = gen.next(FullState).value;
        const expected = put({ type: TypeKeys.PREPARE_TO_PAY } as PrepareToPay);
        expect(actual).toEqual(expected);
    });

    it('should call providePayment', () => {
        const actual = gen.next().value;
        const expected = call(providePayment, method, config, model, amountInfo, values);
        expect(actual).toEqual(expected);
    });

    it('should select invoiceEventsStatus', () => {
        const actual = gen.next().value;
        const expected = select((state: State) => state.events.status);
        expect(actual.toString()).toEqual(expected.toString());
    });

    it('should call paymentComplete', () => {
        const clone = gen.clone();
        const actual = clone.next(EventsStatus.polled as any).value;
        const expected = call(paymentComplete);
        expect(actual).toEqual(expected);
    });

    it('should put processed', () => {
        const clone = gen.clone();
        const actual = clone.next(EventsStatus.timeout as any).value;
        const expected = put(goToFormInfo(new ResultFormInfo(ResultType.processed)));
        expect(actual).toEqual(expected);
    });

    it('should put payment failed', () => {
        const error = {};
        const actual = gen.throw(error).value;
        const expected = put({
            type: TypeKeys.PAYMENT_FAILED,
            payload: error
        });
        expect(actual).toEqual(expected);
    });

    it('should put error', () => {
        const actual = gen.next().value;
        const expected = put(goToFormInfo(new ResultFormInfo(ResultType.error)));
        expect(actual).toEqual(expected);
    });
});

describe('paymentComplete', () => {
    const iterator = paymentComplete();

    it('should select events', () => {
        const actual = iterator.next().value;
        const expected = select((state: State) => last(state.events.events));
        expect(actual.toString()).toEqual(expected.toString());
    });

    it('should call provideFromInvoiceEvent', () => {
        const event = {
            id: 1,
            createdAt: 'createdAtMock',
            changes: []
        } as any;
        const actual = iterator.next(event).value;
        const expected = call(provideFromInvoiceEvent, event);
        expect(actual).toEqual(expected);
    });

    it('should put payment complete', () => {
        const actual = iterator.next().value;
        const expected = put({ type: TypeKeys.PAYMENT_COMPLETED } as PaymentCompleted);
        expect(actual).toEqual(expected);
    });
});
