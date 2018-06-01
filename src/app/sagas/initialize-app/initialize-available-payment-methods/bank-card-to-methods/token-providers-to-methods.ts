import { call, CallEffect } from 'redux-saga/effects';
import {
    AmountInfoState,
    ConfigState,
    PaymentMethod as PaymentMethodState,
    PaymentMethodName as PaymentMethodNameState
} from 'checkout/state';
import { BankCardTokenProvider } from 'checkout/backend';
import { isReadyToApplePay } from './is-ready-to-apple-pay';
import { isReadyToGooglePay } from './is-ready-to-google-pay';

export function* tokenProvidersToMethods(providers: BankCardTokenProvider[], config: ConfigState, amountInfo: AmountInfoState): Iterator<CallEffect | PaymentMethodState[]> {
    const result = [];
    for (const provider of providers) {
        switch (provider) {
            case BankCardTokenProvider.applepay:
                const {appConfig: {applePayMerchantID}, inFrame} = config;
                const isApplePay = yield call(isReadyToApplePay, applePayMerchantID, inFrame);
                if (isApplePay) {
                    result.push({name: PaymentMethodNameState.ApplePay});
                }
                break;
            case BankCardTokenProvider.googlepay:
                const isGooglePay = yield call(isReadyToGooglePay, amountInfo);
                if (isGooglePay) {
                    result.push({name: PaymentMethodNameState.GooglePay});
                }
                break;
        }
    }
    return result;
}
