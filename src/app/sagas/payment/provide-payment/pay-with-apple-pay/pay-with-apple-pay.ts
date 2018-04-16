import { call } from 'redux-saga/effects';
import { ModelState, TokenProviderFormValues } from 'checkout/state';
import { Config } from 'checkout/config';
import { Amount, getLastChange } from 'checkout/utils';
import { beginSession } from './begin-session';
import { createSession } from './create-session';
import { createApplePay, createCardData } from '../create-payment-resource';
import {
    Event,
    InvoiceChangeType,
    InvoiceStatusChanged,
    PaymentStatusChanged,
    PaymentStatuses
} from 'checkout/backend';
import { InvoiceStatuses } from 'checkout/backend/model';
import { makeAbstractPayment } from '../abstract-payment';
import { ProvidePaymentEffects } from '../provide-payment';

// TODO return after backend implementation
// const createPaymentResource = (endpoint: string, merchantID: string, paymentToken: ApplePayPayment) =>
//     createApplePay.bind(null, endpoint, merchantID, paymentToken);

const createPaymentResource = (endpoint: string, merchantID: string, paymentToken: ApplePayPayment) =>
    createCardData.bind(null, endpoint, {
        cardNumber: '4242 4242 4242 4242',
        expireDate: '12 / 20',
        secureCode: '123',
        cardHolder: 'LEXA SVOTIN'
    });

const fromPaymentStatusChanged = (change: PaymentStatusChanged): boolean => {
    switch (change.status) {
        case PaymentStatuses.processed:
        case PaymentStatuses.captured:
            return true;
        default:
            return false;
    }
};

const fromInvoiceStatusChanged = (change: InvoiceStatusChanged): boolean => {
    switch (change.status) {
        case InvoiceStatuses.paid:
        case InvoiceStatuses.fulfilled:
            return true;
        default:
            return false;
    }
};

const isSuccess = (events: Event[]): boolean => {
    const change = getLastChange(events);
    switch (change.changeType) {
        case InvoiceChangeType.PaymentStatusChanged:
            return fromPaymentStatusChanged(change as PaymentStatusChanged);
        case InvoiceChangeType.InvoiceStatusChanged:
            return fromInvoiceStatusChanged(change as InvoiceStatusChanged);
        default:
            return false;
    }
};

const getSessionStatus = (events: Event[]): number => isSuccess(events)
    ? ApplePaySession.STATUS_SUCCESS
    : ApplePaySession.STATUS_FAILURE;

export function* payWithApplePay(config: Config, model: ModelState, formValues: TokenProviderFormValues, amountInfo: Amount): Iterator<ProvidePaymentEffects> {
    const {initConfig, appConfig} = config;
    const session = createSession(initConfig.description, amountInfo);
    try {
        const paymentToken = yield call(beginSession, config, session);
        const {capiEndpoint, applePayMerchantID} = appConfig;
        const fn = createPaymentResource(capiEndpoint, applePayMerchantID, paymentToken);
        const events = yield call(makeAbstractPayment, config, model, formValues.email, amountInfo, fn);
        session.completePayment(getSessionStatus(events));
        return events;
    } catch (error) {
        session.completePayment(ApplePaySession.STATUS_FAILURE);
        throw error;
    }
}
