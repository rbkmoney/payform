import { call, CallEffect } from 'redux-saga/effects';

import { AmountInfoState } from 'checkout/state';
import { isYandexPayAvailable } from '../../../../../environment';
import { loadThirdPartLib } from './load-third-part-lib';

export function* isReadyToYandexPay(_amountInfo: AmountInfoState): Iterator<CallEffect | boolean> {
    if (yield call(loadThirdPartLib, 'https://pay.yandex.ru/sdk/v1/pay.js')) {
        return isYandexPayAvailable();
    }
    return false;
}
