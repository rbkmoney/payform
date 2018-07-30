import { CallEffect } from 'redux-saga/effects';
import { AmountInfoState } from 'checkout/state';

export function* isReadyToSamsungPay(amountInfo: AmountInfoState): Iterator<CallEffect | boolean> {
    return true;
}
