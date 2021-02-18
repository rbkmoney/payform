import { call, CallEffect, SelectEffect } from 'redux-saga/effects';

import { AmountInfoState, ModelState, TokenProviderFormValues } from 'checkout/state';
import { Config } from 'checkout/config';
import { createYandexPay } from '../../../create-payment-resource';
import { makePayment } from '../make-payment';
import { getPaymentData } from './get-payment-data';
import { processYaCheckout } from './process-ya-checkout';
import { completeYaPayment } from './complete-ya-payment';
import { prepareYaPayment } from './prepare-ya-payment';

const createPaymentResource = (endpoint: string, merchantID: string, paymentToken: object) =>
    createYandexPay.bind(null, endpoint, merchantID, paymentToken);

export function* payWithYandexPay(
    c: Config,
    m: ModelState,
    a: AmountInfoState,
    v: TokenProviderFormValues
): Iterator<SelectEffect | CallEffect> {
    const { appConfig } = c;
    const paymentData = getPaymentData(
        appConfig.yandexPayMerchantID,
        appConfig.yandexPayGatewayMerchantID,
        a,
        v.amount
    );
    const yaPayment = YaPay.Payment.create(paymentData);
    const prepared = yield call(prepareYaPayment, yaPayment);
    if (!prepared) {
        throw { code: 'error.yandex.pay.unavailable' };
    }
    const yaProcessEvent = yield call(processYaCheckout, yaPayment);
    try {
        const { capiEndpoint, yandexPayGatewayMerchantID } = appConfig;
        const fn = createPaymentResource(capiEndpoint, yandexPayGatewayMerchantID, yaProcessEvent);
        yield call(makePayment, c, m, v, a, fn);
    } catch (error) {
        yaPayment.complete(YaPay.CompleteReason.Error, null);
        throw error;
    }
    yield call(completeYaPayment, yaPayment);
}
