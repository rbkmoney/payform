import { call, CallEffect, select, SelectEffect } from 'redux-saga/effects';
import { InitConfig, InvoiceTemplateInitConfig } from 'checkout/config';
import { ModelState, State } from 'checkout/state';
import { Amount } from 'checkout/utils';
import { createInvoiceWithTemplate } from './create-invoice-with-template';
import { Invoice } from 'checkout/backend';

type Effects = CallEffect | SelectEffect | InvoiceAndToken;

interface InvoiceAndToken {
    invoice: Invoice;
    invoiceAccessToken: string;
}

export function* getPayableInvoice(initConfig: InitConfig, endpoint: string, model: ModelState, amountInfo: Amount): Iterator<Effects> {
    const {invoice, invoiceTemplate, invoiceAccessToken} = model;
    if (invoice && invoice.amount === amountInfo.value) {
        return {invoice, invoiceAccessToken};
    }
    if (invoiceTemplate) {
        const {invoiceTemplateAccessToken} = initConfig as InvoiceTemplateInitConfig;
        yield call(
            createInvoiceWithTemplate,
            endpoint,
            invoiceTemplateAccessToken,
            invoiceTemplate,
            amountInfo
        );
        return yield select((s: State) => ({
            invoice: s.model.invoice,
            invoiceAccessToken: s.model.invoiceAccessToken
        }));
    }
    throw {code: 'error.inconsistent.model'};
}
