import { call, CallEffect, ForkEffect, put, PutEffect, select, SelectEffect, takeLatest } from 'redux-saga/effects';
import { last } from 'lodash-es';
import {
    GoToFormInfo,
    goToFormInfo,
    PaymentCompleted,
    PaymentFailed,
    PaymentRequested,
    PrepareToPay,
    TypeKeys
} from 'checkout/actions';
import { providePayment } from './provide-payment';
import { PaymentFlowResultState, ResultFormInfo, ResultType, State } from 'checkout/state';
import { provideFromInvoiceEvent } from '../provide-modal';

type PayPutEffect = PrepareToPay | PaymentFailed | PaymentCompleted | GoToFormInfo;

type PayEffect = SelectEffect | CallEffect | PutEffect<PayPutEffect>;

export function* pay(action: PaymentRequested): Iterator<PayEffect> {
    try {
        const { config, model, amountInfo } = yield select((s: State) => ({
            config: s.config,
            model: s.model,
            amountInfo: s.amountInfo
        }));
        const { values, method } = action.payload;
        yield put({ type: TypeKeys.PREPARE_TO_PAY } as PrepareToPay);
        yield call(providePayment, method, config, model, amountInfo, values);
        const paymentFlowResult = yield select((state: State) => state.paymentFlowResult);
        switch (paymentFlowResult) {
            case PaymentFlowResultState.known:
                const event = yield select((state: State) => last(state.model.invoiceEvents));
                yield call(provideFromInvoiceEvent, event);
                yield put({ type: TypeKeys.PAYMENT_COMPLETED } as PaymentCompleted);
                break;
            case PaymentFlowResultState.unknown:
                yield put(goToFormInfo(new ResultFormInfo(ResultType.processed)));
                break;
        }
    } catch (error) {
        yield put({
            type: TypeKeys.PAYMENT_FAILED,
            payload: error
        } as PaymentFailed);
        yield put(goToFormInfo(new ResultFormInfo(ResultType.error)));
    }
}

export function* watchPayment(): Iterator<ForkEffect> {
    yield takeLatest(TypeKeys.PAYMENT_REQUESTED, pay);
}
