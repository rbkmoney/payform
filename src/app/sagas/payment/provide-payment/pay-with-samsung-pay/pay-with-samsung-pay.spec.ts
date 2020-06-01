import { payWithSamsungPay, createPaymentResource } from './pay-with-samsung-pay';
import { makePayment } from '../make-payment';
import { createTransaction } from './create-transaction';
import { put, call } from 'redux-saga/effects';
import { SetModalState, TypeKeys } from 'checkout/actions';
import { ModalInteraction, ModalInteractionType, TokenizedInteractionObject } from 'checkout/state';
import { URIPath, Type } from '../../../../../constants/samsung-pay-communicator';
import { getResultData } from './get-result-data';
import { cloneableGenerator } from 'redux-saga/utils';
import { SagaIterator } from 'redux-saga';

describe('payWithSamsungPay', () => {
    const endpoint = 'http://test.endpoint';
    const samsungPayServiceID = 'samsungPayServiceIDMock' as any;
    const locale = 'localeMock' as any;
    const appConfig = {
        capiEndpoint: endpoint,
        samsungPayServiceID
    } as any;
    const c = { appConfig, initConfig: { locale } } as any;
    const resultData = { refId: 'refIdMock', type: Type.SUCCESS } as any;
    const m = 'ModelStateMock' as any;
    const a = 'AmountInfoStateMock' as any;
    const v = 'PayableFormValuesMock' as any;
    const gen = cloneableGenerator(() => payWithSamsungPay(c, m, a, v) as SagaIterator)();

    it('should call createTransaction', () => {
        const actual = gen.next().value;
        const expected = createTransaction(appConfig, a, v);
        expect(actual).toEqual(expected);
    });

    it('should put set modal state', () => {
        const actual = gen.next().value;
        const expected = put<SetModalState>({
            type: TypeKeys.SET_MODAL_STATE,
            payload: new ModalInteraction(
                {
                    type: ModalInteractionType.TokenizedInteraction,
                    uri: URIPath
                } as TokenizedInteractionObject,
                true
            )
        });
        expect(actual).toEqual(expected);
    });

    it('should call getResultData', () => {
        const transaction = 'transactionMock' as any;
        const actual = gen.next().value;
        const expected = getResultData(transaction, samsungPayServiceID, locale);
        expect(actual).toEqual(expected);
    });

    it('should call makePayment', () => {
        const fn = createPaymentResource(c.appConfig.capiEndpoint, resultData.refId, c.appConfig.samsungPayServiceID);
        const clone = gen.clone();
        const actual = clone.next(resultData).value;
        const expected = call(makePayment, c, m, v, a, fn);
        expect(actual.toString()).toEqual(expected.toString());
    });

    it('should throw error', () => {
        const clone = gen.clone();
        const error = { code: 'error.samsung.pay.cancel' };
        resultData.type = Type.ERROR;
        let actual;
        try {
            actual = clone.next(resultData).value;
        } catch (e) {
            actual = e;
        }
        expect(actual).toEqual(error);
    });
});
