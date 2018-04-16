import { call, CallEffect, ForkEffect, put, PutEffect, takeLatest } from 'redux-saga/effects';
import { TypeKeys, PaymentRequested, PaymentFailed } from 'checkout/actions';
import { getAmountInfo } from './get-amount-info';
import { providePayment } from './provide-payment';

type PayPutEffect = PaymentFailed;

type PayEffect =
    CallEffect |
    PutEffect<PayPutEffect>;

export function* pay(action: PaymentRequested): Iterator<PayEffect> {
    try {
        const {config, model, values} = action.payload;
        const amountInfo = getAmountInfo(model, config.initConfig.amount, values.amount);
        const events = yield call(providePayment, action.payload, amountInfo);
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
