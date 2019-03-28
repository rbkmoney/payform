import { call, CallEffect } from 'redux-saga/effects';

import { isGooglePaymentClientAvailable } from '../../../../../environment';
import { logPrefix } from 'checkout/log-messages';
import { AmountInfoState } from 'checkout/state';
import { loadThirdPartLib } from './load-third-part-lib';

async function isReadyToPay(): Promise<boolean> {
    if (!isGooglePaymentClientAvailable()) {
        return false;
    }
    const paymentsClient = new google.payments.api.PaymentsClient({ environment: 'PRODUCTION' });
    const allowedPaymentMethods = ['CARD', 'TOKENIZED_CARD'];
    try {
        /**
         * paymentsClient.isReadyToPay promise may not be resolved
         * (it happened on browsers: Yandex browser for Android in mobile view, some Samsung Internet browsers)
         */
        const { result } = (await Promise.race([
            paymentsClient.isReadyToPay({ allowedPaymentMethods }),
            new Promise((res, rej) => setTimeout(() => rej(new Error('timeout')), 4000))
        ])) as ReadyToPayResponse;
        return result;
    } catch (e) {
        console.error(`${logPrefix} isReadyToGooglePay`, e);
        return false;
    }
}

export function* isReadyToGooglePay(amountInfo: AmountInfoState): Iterator<CallEffect | boolean> {
    if (yield call(loadThirdPartLib, 'https://pay.google.com/gp/p/js/pay.js')) {
        return yield call(isReadyToPay);
    }
    return false;
}
