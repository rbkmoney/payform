import { call, CallEffect } from 'redux-saga/effects';
import { validateMerchant } from './validate-merchant';
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

const begin = (session: ApplePaySession, validationEndpoint: string, payload: ApplePayPayload): Promise<ApplePayPayment> =>
    new Promise((resolve, reject) => {
        session.onvalidatemerchant = (event) =>
            validateMerchant(validationEndpoint, payload, event.validationURL)
                .then((response) => session.completeMerchantValidation(response))
                .catch((error) => {
                    session.abort();
                    reject(toLogicError(error));
                });
        session.oncancel = (event) => reject(toLogicError(event));
        session.onpaymentauthorized = (event) => resolve(event.payment);
        session.begin();
    });

export function* beginSession(config: Config, session: ApplePaySession): Iterator<CallEffect> {
    const { applePayMerchantID, wrapperEndpoint } = config.appConfig;
    const payload = {
        merchantIdentifier: applePayMerchantID,
        domainName: location.hostname,
        displayName: 'RBKmoney Checkout'
    };
    return yield call(begin, session, `${wrapperEndpoint}/applepay`, payload);
}
