import { call, CallEffect, select } from 'redux-saga/effects';
import { InitConfig, InvoiceTemplateInitConfig } from 'checkout/config';
import { AmountInfoState, ModelState, State } from 'checkout/state';
import { createInvoiceWithTemplate } from './create-invoice-with-template';
import { Invoice, InvoiceTemplate } from 'checkout/backend';

type Effects = CallEffect | InvoiceAndToken;

interface InvoiceAndToken {
    invoice: Invoice;
    invoiceAccessToken: string;
}

function* createInvoice(initConfig: InvoiceTemplateInitConfig, endpoint: string, invoiceTemplate: InvoiceTemplate, amountInfo: AmountInfoState, formAmount: string) {
    const {invoiceTemplateAccessToken} = initConfig;
    yield call(
        createInvoiceWithTemplate,
        endpoint,
        invoiceTemplateAccessToken,
        invoiceTemplate,
        amountInfo,
        formAmount
    );
    const {invoice, invoiceAccessToken} = yield select((s: State) => ({
        invoice: s.model.invoice,
        invoiceAccessToken: s.model.invoiceAccessToken
    }));
    return {invoice, invoiceAccessToken};
}

export function* getPayableInvoice(initConfig: InitConfig, endpoint: string, model: ModelState, amountInfo: AmountInfoState, formAmount: string): Iterator<Effects> {
    const {invoice, invoiceTemplate, invoiceAccessToken} = model;
    if (invoice && invoice.amount === amountInfo.minorValue) {
        return {invoice, invoiceAccessToken};
    }
    if (invoiceTemplate) {
        return yield call(createInvoice, initConfig, endpoint, invoiceTemplate, amountInfo, formAmount);
    }
    throw {code: 'error.inconsistent.model'};
}
