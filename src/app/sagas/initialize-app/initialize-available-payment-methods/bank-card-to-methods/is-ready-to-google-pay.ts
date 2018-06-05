import { call, race } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import {
    isAppleEnvironment,
    isGooglePaymentClientAvailable
} from '../../../../../environment';
import { logPrefix } from 'checkout/log-messages';
import { AmountInfoState } from 'checkout/state';
import { getScript } from 'checkout/utils';

const methodData = [
    {
        supportedMethods: 'https://google.com/pay',
        data: {
            apiVersion: 1,
            environment: 'TEST',
            merchantId: '01234567890123456789',
            paymentMethodTokenizationParameters: {
                tokenizationType: 'DIRECT',
                parameters: {
                    publicKey: 'BEJu+/Hdlnl/k7RhX1G76buiQ2/p1c3A91GHWSjKChbZDfbKgzvvn0IS3U4f2La/7YE2MV8V/jYSOFWSw/DnsV0='
                }
            },
            allowedPaymentMethods: ['CARD', 'TOKENIZED_CARD'],
            cardRequirements: {
                allowedCardNetworks: ['MASTERCARD', 'VISA']
            }
        }
    }
];

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
    if (!isAppleEnvironment() && isGooglePaymentClientAvailable()) {
        return Promise.resolve(false);
    }
    const paymentsClient = new google.payments.api.PaymentsClient({environment: 'TEST'});
    const allowedPaymentMethods = ['CARD', 'TOKENIZED_CARD'];
    return paymentsClient.isReadyToPay({allowedPaymentMethods})
        .then((res) => res.result)
        .catch((ex) => {
            console.error(`${logPrefix} isReadyToGooglePay`, ex);
            return false;
        });
}

export function* isReadyToGooglePay(amountInfo: AmountInfoState) {
    if (yield call(loadPaymentsClient)) {
        return yield call(isReadyToPay);
    }
    return false;
}
