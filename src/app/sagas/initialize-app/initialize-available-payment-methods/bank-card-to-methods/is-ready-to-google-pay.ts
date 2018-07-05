import { call, CallEffect, race } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import {
    isGooglePaymentClientAvailable
} from '../../../../../environment';
import { logPrefix } from 'checkout/log-messages';
import { AmountInfoState } from 'checkout/state';
import { getScript } from 'checkout/utils';

function* loadPaymentsClient() {
    const endpoint = 'https://pay.google.com/gp/p/js/pay.js';
    const [timeout] = yield race<any>([
        call(delay, 2000),
        call(getScript, endpoint)
    ]);
    if (timeout) {
        console.warn(`${logPrefix} Load timeout ${endpoint}`);
    }
    return !timeout;
}

function isReadyToPay(): Promise<boolean> {
    if (!isGooglePaymentClientAvailable()) {
        return Promise.resolve(false);
    }
    const paymentsClient = new google.payments.api.PaymentsClient({environment: 'PRODUCTION'});
    const allowedPaymentMethods = ['CARD', 'TOKENIZED_CARD'];
    return paymentsClient.isReadyToPay({allowedPaymentMethods})
        .then((res) => res.result)
        .catch((ex) => {
            console.error(`${logPrefix} isReadyToGooglePay`, ex);
            return false;
        });
}

export function* isReadyToGooglePay(amountInfo: AmountInfoState): Iterator<CallEffect | boolean> {
    if (yield call(loadPaymentsClient)) {
        return yield call(isReadyToPay);
    }
    return false;
}
