import { validateMerchant } from './validate-merchant';
import { call, CallEffect } from 'redux-saga/effects';
import { Config } from 'checkout/config';
import { LogicError } from 'checkout/backend';

const toLogicError = (errorEvent: any): LogicError => {
    const unknown = {
        code: 'error.apple.pay.unknown'
    };
    if (!errorEvent && !errorEvent.type) {
        return unknown;
    }
    switch (errorEvent.type) {
        case 'cancel':
            return {
                code: 'error.apple.pay.cancel'
            };
        default:
            return unknown;
    }
};

const begin = (session: ApplePaySession, endpoint: string, payload: ApplePayPayload): Promise<ApplePayPayment> =>
    new Promise((resolve, reject) => {
        session.onvalidatemerchant = (event) =>
            validateMerchant(endpoint, payload, event.validationURL)
                .then((response: any) => session.completeMerchantValidation(response))
                .catch((error) => {
                    session.abort();
                    reject(toLogicError(error));
                });
        session.oncancel = (event) => reject(toLogicError(event));
        session.onpaymentauthorized = (event) => resolve(event.payment);
        session.begin();
    });

export function* beginSession(config: Config, session: ApplePaySession): Iterator<CallEffect> {
    const {applePayMerchantID, wrapperEndpoint} = config.appConfig;
    const applePayMerchantValidationEndpoint = wrapperEndpoint + '/applepay';
    const payload = {
        merchantIdentifier: applePayMerchantID,
        domainName: new URL(config.origin).hostname,
        displayName: 'RBKmoney Checkout'
    };
    return yield call(begin, session, applePayMerchantValidationEndpoint, payload);
}
