import { call, CallEffect } from 'redux-saga/effects';
import { AmountInfoState, ModelState, PayableFormValues } from 'checkout/state';
import { getPayableInvoice } from './get-payable-invoice';
import { PaymentResource } from 'checkout/backend';
import { Config } from 'checkout/config';
import { createPayment } from './create-payment';
import { pollInvoiceEvents } from '../../poll-events';

type CreatePaymentResourceFn = () => Iterator<PaymentResource>;

export function* makePayment(
    config: Config,
    model: ModelState,
    values: PayableFormValues,
    amountInfo: AmountInfoState,
    fn: CreatePaymentResourceFn
): Iterator<CallEffect> {
    const { initConfig, appConfig } = config;
    const { capiEndpoint } = appConfig;
    const {
        invoice: { id },
        invoiceAccessToken
    } = yield call(getPayableInvoice, initConfig, capiEndpoint, model, amountInfo, values.amount);
    const paymentResource = yield call(fn, invoiceAccessToken);
    yield call(createPayment, capiEndpoint, invoiceAccessToken, id, values.email, paymentResource, initConfig);
    yield call(pollInvoiceEvents, capiEndpoint, invoiceAccessToken, id);
}
