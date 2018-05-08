import {
    CallEffect,
    ForkEffect,
    PutEffect,
    SelectEffect,
    put,
    call,
    select,
    takeLatest
} from 'redux-saga/effects';
import {
    TypeKeys,
    PrepareToPay,
    PaymentRequested,
    PaymentFailed,
    PaymentCompleted
} from 'checkout/actions';
import { providePayment } from './provide-payment';
import { State } from 'checkout/state';
import { provideFromInvoiceEvent } from '../provide-modal';

type PayPutEffect = PrepareToPay | PaymentFailed | PaymentCompleted;

type PayEffect =
    SelectEffect |
    CallEffect |
    PutEffect<PayPutEffect>;

export function* pay(action: PaymentRequested): Iterator<PayEffect> {
    try {
        const {config, model} = yield select((s: State) => ({config: s.config, model: s.model}));
        const {values, method} = action.payload;
        yield put({type: TypeKeys.PREPARE_TO_PAY} as PrepareToPay);
        const event = yield call(providePayment, method, config, model, values);
        yield call(provideFromInvoiceEvent, event);
        yield put({type: TypeKeys.PAYMENT_COMPLETED} as PaymentCompleted);
    } catch (error) {
        yield put({
            type: TypeKeys.PAYMENT_FAILED,
            payload: error
        } as PaymentFailed);
    }
}

export function* watchPayment(): Iterator<ForkEffect> {
    yield takeLatest(TypeKeys.PAYMENT_REQUESTED, pay);
}
