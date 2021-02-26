import { call, CallEffect } from 'redux-saga/effects';

export function* createYaPayment(paymentData: YaPay.PaymentData): Iterator<CallEffect | YaPay.Payment> {
    try {
        return yield call(YaPay.createPayment, paymentData);
    } catch (error) {
        throw { code: 'error.yandex.pay.unavailable' };
    }
}
