import {
    call,
    CallEffect,
    ForkEffect,
    put,
    PutEffect,
    select,
    SelectEffect,
    takeLatest
} from 'redux-saga/effects';
import {
    TypeKeys,
    PaymentRequested,
    PaymentFailed,
    PaymentCompleted
} from 'checkout/actions';
import { getAmountInfo } from './get-amount-info';
import { providePayment } from './provide-payment';
import { State } from 'checkout/state';
import { provideModal } from './provide-modal';

type PayPutEffect = PaymentFailed;

type PayEffect =
    SelectEffect |
    CallEffect |
    PutEffect<PayPutEffect | PaymentCompleted>;

export function* pay(action: PaymentRequested): Iterator<PayEffect> {
    try {
        const {config, model} = yield select((s: State) => ({
            config: s.config,
            model: s.model
        }));
        const {values, method} = action.payload;
        const amountInfo = getAmountInfo(model, config.initConfig.amount, values.amount);
        const event = yield call(providePayment, method, config, model, values, amountInfo);
        yield call(provideModal, event);
        yield put({
            type: TypeKeys.PAYMENT_COMPLETED
        } as PaymentCompleted);
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
