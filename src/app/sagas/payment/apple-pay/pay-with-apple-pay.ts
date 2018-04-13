import { call } from 'redux-saga/effects';
import { ModelState, TokenProviderFormValues } from 'checkout/state';
import { Config } from 'checkout/config';
import { beginSession } from './begin-session';
import { getAmountInfo } from '../get-amount-info';
import { createSession } from './create-session';
import { createApplePay, createCardData } from '../create-payment-resource';
import { getPayableInvoice } from '../get-payable-invoice';
import { createPayment } from '../create-payment';
import { pollInvoiceEvents } from '../poll-events';
import { PaymentResource } from 'checkout/backend';
import { Amount } from 'checkout/utils';

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

export function* payWithApplePay(config: Config, model: ModelState, formValues: TokenProviderFormValues): Iterator<any> {
    const {initConfig, appConfig} = config;
    const {amount, email} = formValues;
    const amountInfo = getAmountInfo(model, initConfig.amount, amount);
    const session = createSession(initConfig.description, amountInfo);
    try {
        const paymentToken = yield call(beginSession, config, session);
        const {capiEndpoint, applePayMerchantID} = appConfig;
        const fn = createPaymentResource(capiEndpoint, applePayMerchantID, paymentToken);
        yield pay(config, model, email, amountInfo, fn);
        session.completePayment(ApplePaySession.STATUS_SUCCESS);
    } catch (error) {
        session.completePayment(ApplePaySession.STATUS_FAILURE);
        throw error;
    }
}

type CreatePaymentResourceFn = () => Iterator<PaymentResource>;

export function* pay(config: Config, model: ModelState, email: string, amountInfo: Amount, fn: CreatePaymentResourceFn) {
    const {initConfig, appConfig} = config;
    const {capiEndpoint} = appConfig;
    const {invoice: {id}, invoiceAccessToken} = yield call(getPayableInvoice, initConfig, capiEndpoint, model, amountInfo);
    const paymentResource = yield call(fn, invoiceAccessToken);
    yield call(createPayment, capiEndpoint, invoiceAccessToken, id, email, paymentResource, initConfig);
    yield call(pollInvoiceEvents, capiEndpoint, invoiceAccessToken, id, model.invoiceEvents);
}
