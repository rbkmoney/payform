import { call } from 'redux-saga/effects';
import last from 'lodash-es/last';
import { ModelState, TokenProviderFormValues } from 'checkout/state';
import { Config } from 'checkout/config';
import { Amount } from 'checkout/utils';
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
import { makePayment } from '../make-payment';
import { ProvidePaymentEffects } from '../provide-payment';

// TODO return after backend implementation
// const createPaymentResource = (endpoint: string, merchantID: string, paymentToken: ApplePayPayment) =>
//     createApplePay.bind(null, endpoint, merchantID, paymentToken);

const createPaymentResource = (endpoint: string, merchantID: string, paymentToken: ApplePayPayment) =>
    createCardData.bind(null, endpoint, {
        // cardNumber: '4242 4242 4242 4242',
        cardNumber: '4000 0000 0000 0002',
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

const isSuccess = (event: Event): boolean => {
    const change = last(event.changes);
    switch (change.changeType) {
        case InvoiceChangeType.PaymentStatusChanged:
            return fromPaymentStatusChanged(change as PaymentStatusChanged);
        case InvoiceChangeType.InvoiceStatusChanged:
            return fromInvoiceStatusChanged(change as InvoiceStatusChanged);
        default:
            return false;
    }
};

const getSessionStatus = (event: Event): number => isSuccess(event)
    ? ApplePaySession.STATUS_SUCCESS
    : ApplePaySession.STATUS_FAILURE;

export function* payWithApplePay(c: Config, m: ModelState, v: TokenProviderFormValues, amount: Amount): Iterator<ProvidePaymentEffects> {
    const {initConfig: {description, name}, appConfig} = c;
    const label = description || name || 'RBKmoney';
    const session = createSession(label, amount);
    const paymentToken = yield call(beginSession, c, session);
    const {capiEndpoint, applePayMerchantID} = appConfig;
    try {
        const fn = createPaymentResource(capiEndpoint, applePayMerchantID, paymentToken);
        const event = yield call(makePayment, c, m, v.email, amount, fn);
        session.completePayment(getSessionStatus(event));
        return event;
    } catch (error) {
        session.completePayment(ApplePaySession.STATUS_FAILURE);
        throw error;
    }
}
