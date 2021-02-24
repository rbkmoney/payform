import { call, CallEffect, race, RaceEffect } from 'redux-saga/effects';
import { delay } from 'redux-saga';

import { getYaPayPaymentData } from 'checkout/utils';
import { logPrefix } from 'checkout/log-messages';

import { isYandexPayAvailable } from '../../../../../environment';
import { loadThirdPartLib } from './load-third-part-lib';

function* createYaPayment(paymentData: YaPay.PaymentData, delayMs: number): Iterator<RaceEffect | boolean> {
    try {
        const [timeout] = yield race<any>([call(delay, delayMs), call(YaPay.createPayment, paymentData)]);
        return !timeout;
    } catch (ex) {
        return false;
    }
}

export function* isReadyToYandexPay(
    yaPayMerchantID: string,
    yaPayGatewayMerchantId: string,
    delayMs = 2000
): Iterator<CallEffect | boolean> {
    if (yield call(loadThirdPartLib, 'https://pay.yandex.ru/sdk/v1/pay.js', delayMs)) {
        const available = isYandexPayAvailable();
        if (!available) {
            return false;
        }
    }
    const paymentData = getYaPayPaymentData(yaPayMerchantID, yaPayGatewayMerchantId);
    try {
        return yield call(createYaPayment, paymentData, delayMs);
    } catch (error) {
        console.error(`${logPrefix} YaPay is not available`, error);
        return false;
    }
}
