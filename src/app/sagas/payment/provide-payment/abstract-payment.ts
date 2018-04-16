import { call, CallEffect } from 'redux-saga/effects';
import { ModelState } from 'checkout/state';
import { getPayableInvoice } from './get-payable-invoice';
import { Event, PaymentResource } from 'checkout/backend';
import { Config } from 'checkout/config';
import { Amount } from 'checkout/utils';
import { createPayment } from './create-payment';
import { pollEvents } from './poll-events';

type CreatePaymentResourceFn = () => Iterator<PaymentResource>;

type Effects = CallEffect | Event[];

export function* makeAbstractPayment(config: Config, model: ModelState, email: string, amountInfo: Amount, fn: CreatePaymentResourceFn): Iterator<Effects> {
    const {initConfig, appConfig} = config;
    const {capiEndpoint} = appConfig;
    const {invoice: {id}, invoiceAccessToken} = yield call(getPayableInvoice, initConfig, capiEndpoint, model, amountInfo);
    const paymentResource = yield call(fn, invoiceAccessToken);
    yield call(createPayment, capiEndpoint, invoiceAccessToken, id, email, paymentResource, initConfig);
    return yield call(pollEvents, capiEndpoint, invoiceAccessToken, id, model.invoiceEvents);
}
