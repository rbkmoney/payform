import { call, CallEffect } from 'redux-saga/effects';
import { isApplePayAvailable } from '../../../../../environment';
import { logPrefix } from 'checkout/log-messages';

export function* isReadyToApplePay(applePayMerchantID: string, inFrame: boolean): Iterator<CallEffect | boolean> {
    const available = isApplePayAvailable();
    if (!available) {
        return false;
    }
    try {
        const canMakePayments = yield call(ApplePaySession.canMakePaymentsWithActiveCard, applePayMerchantID);
        if (!inFrame) {
            console.error(`${logPrefix} Apple Pay is not available in frame`);
        }
        return canMakePayments;
    } catch (error) {
        console.error(`${logPrefix} ApplePaySession.canMakePaymentsWithActiveCard`, error);
        return false;
    }
}
