import { call, CallEffect, ForkEffect, put, PutEffect, takeLatest } from 'redux-saga/effects';
import { TypeKeys, PaymentRequested, PaymentFailed } from 'checkout/actions';
import { PaymentMethodName } from 'checkout/state';
import { payWithApplePay } from './apple-pay';

type PayPutEffect = PaymentFailed;

type PayEffect =
    CallEffect |
    PutEffect<PayPutEffect>;

export function* pay(action: PaymentRequested): Iterator<PayEffect> {
    try {
        const {method, config, model, values} = action.payload;
        switch (method) {
            case PaymentMethodName.ApplePay:
                yield call(payWithApplePay, config, model, values);
        }
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
