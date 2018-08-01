import { call, CallEffect } from 'redux-saga/effects';
import { isGooglePaymentClientAvailable } from '../../../../../environment';
import { logPrefix } from 'checkout/log-messages';
import { AmountInfoState } from 'checkout/state';
import { loadThirdPartLib } from './load-third-part-lib';

function isReadyToPay(): Promise<boolean> {
    if (!isGooglePaymentClientAvailable()) {
        return Promise.resolve(false);
    }
    const paymentsClient = new google.payments.api.PaymentsClient({ environment: 'PRODUCTION' });
    const allowedPaymentMethods = ['CARD', 'TOKENIZED_CARD'];
    return paymentsClient
        .isReadyToPay({ allowedPaymentMethods })
        .then((res) => res.result)
        .catch((ex) => {
            console.error(`${logPrefix} isReadyToGooglePay`, ex);
            return false;
        });
}

export function* isReadyToGooglePay(amountInfo: AmountInfoState): Iterator<CallEffect | boolean> {
    if (yield call(loadThirdPartLib, 'https://pay.google.com/gp/p/js/pay.js')) {
        return yield call(isReadyToPay);
    }
    return false;
}
