import { call, CallEffect, select, SelectEffect } from 'redux-saga/effects';
import last from 'lodash-es/last';
import { AmountInfoState, ModelState, State, TokenProviderFormValues } from 'checkout/state';
import { Config } from 'checkout/config';
import { beginSession } from './begin-session';
import { createSession } from './create-session';
import { createApplePay } from '../../../create-payment-resource';
import { PaymentMethod, BankCard } from 'checkout/backend/model';
import { makePayment } from '../make-payment';
import { PaymentMethodName } from 'checkout/backend/model/payment-method';
import { PaymentSystem } from 'checkout/backend/model/payment-system';
import { getSessionStatus } from './get-session-status';

const createPaymentResource = (endpoint: string, merchantID: string, paymentToken: ApplePayPayment) =>
    createApplePay.bind(null, endpoint, merchantID, paymentToken);

const findPaymentSystems = (paymentMethods: PaymentMethod[]): PaymentSystem[] => {
    const found = paymentMethods.find(
        (method) => method.method === PaymentMethodName.BankCard && !!(method as BankCard).tokenProviders
    ) as BankCard;
    return found.paymentSystems;
};

export function* payWithApplePay(
    c: Config,
    m: ModelState,
    a: AmountInfoState,
    v: TokenProviderFormValues
): Iterator<SelectEffect | CallEffect> {
    const {
        initConfig: { description, name },
        appConfig
    } = c;
    const label = description || name || 'RBKmoney';
    const paymentSystems = findPaymentSystems(m.paymentMethods);
    const session = createSession(label, a, paymentSystems, v.amount);
    const paymentToken = yield call(beginSession, c, session);
    const { capiEndpoint, applePayMerchantID } = appConfig;
    try {
        const fn = createPaymentResource(capiEndpoint, applePayMerchantID, paymentToken);
        yield call(makePayment, c, m, v, a, fn);
        const event = yield select((s: State) => last(s.events.events));
        session.completePayment(getSessionStatus(event));
    } catch (error) {
        session.completePayment(ApplePaySession.STATUS_FAILURE);
        throw error;
    }
}
