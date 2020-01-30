import { call } from 'redux-saga/effects';
import { AmountInfoState, ConfigState, PaymentMethodName as PaymentMethodNameState } from 'checkout/state';
import { BankCardTokenProvider } from 'checkout/backend';
import { isReadyToApplePay } from './is-ready-to-apple-pay';
import { isReadyToGooglePay } from './is-ready-to-google-pay';

export function* tokenProvidersToMethods(
    providers: BankCardTokenProvider[],
    config: ConfigState,
    amountInfo: AmountInfoState
) {
    const result = [];
    const { applePay, googlePay, samsungPay } = config.initConfig;
    for (const provider of providers) {
        switch (provider) {
            case BankCardTokenProvider.applepay:
                if (applePay) {
                    const {
                        appConfig: { applePayMerchantID },
                        inFrame
                    } = config;
                    const isApplePay = yield call(isReadyToApplePay, applePayMerchantID, inFrame);
                    if (isApplePay) {
                        result.push({ name: PaymentMethodNameState.ApplePay });
                    }
                }
                break;
            case BankCardTokenProvider.googlepay:
                if (googlePay) {
                    const isGooglePay = yield call(isReadyToGooglePay, amountInfo);
                    if (isGooglePay) {
                        result.push({ name: PaymentMethodNameState.GooglePay });
                    }
                }
                break;
            case BankCardTokenProvider.samsungpay:
                if (samsungPay) {
                    result.push({ name: PaymentMethodNameState.SamsungPay });
                }
                break;
        }
    }
    return result;
}
