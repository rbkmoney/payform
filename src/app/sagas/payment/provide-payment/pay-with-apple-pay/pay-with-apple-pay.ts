import { call } from 'redux-saga/effects';
import { AmountInfoState, ModelState, TokenProviderFormValues } from 'checkout/state';
import { Config } from 'checkout/config';
import { beginSession } from './begin-session';
import { createSession } from './create-session';
import { createApplePay } from '../../../create-payment-resource';
import { PaymentMethod, BankCard } from 'checkout/backend/model';
import { makePayment } from '../make-payment';
import { ProvidePaymentEffects } from '../provide-payment';
import { PaymentMethodName } from 'checkout/backend/model/payment-method';
import { PaymentSystem } from 'checkout/backend/model/payment-system';
import { getSessionStatus } from './get-session-status';

const createPaymentResource = (endpoint: string, merchantID: string, paymentToken: ApplePayPayment) =>
    createApplePay.bind(null, endpoint, merchantID, paymentToken);

const findPaymentSystems = (paymentMethods: PaymentMethod[]): PaymentSystem[] => {
    const found = paymentMethods.find((method) =>
        method.method === PaymentMethodName.BankCard &&
        !!(method as BankCard).tokenProviders) as BankCard;
    return found.paymentSystems;
};

export function* payWithApplePay(c: Config, m: ModelState, a: AmountInfoState, v: TokenProviderFormValues): Iterator<ProvidePaymentEffects> {
    const {initConfig: {description, name}, appConfig} = c;
    const label = description || name || 'RBKmoney';
    const paymentSystems = findPaymentSystems(m.paymentMethods);
    const session = createSession(label, a, paymentSystems);
    const paymentToken = yield call(beginSession, c, session);
    const {capiEndpoint, applePayMerchantID} = appConfig;
    try {
        const fn = createPaymentResource(capiEndpoint, applePayMerchantID, paymentToken);
        const event = yield call(makePayment, c, m, v, a, fn);
        session.completePayment(getSessionStatus(event));
        return event;
    } catch (error) {
        session.completePayment(ApplePaySession.STATUS_FAILURE);
        throw error;
    }
}
