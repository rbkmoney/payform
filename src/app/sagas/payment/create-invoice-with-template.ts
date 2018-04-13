import { call, CallEffect, put, PutEffect } from 'redux-saga/effects';
import { InvoiceTemplate } from 'checkout/backend';
import { createInvoiceWithTemplate as request } from 'checkout/backend';
import { Amount } from '../../utils';
import { InvoiceCreated, TypeKeys } from 'checkout/actions';

export type Effects = CallEffect | PutEffect<InvoiceCreated>;

export function* createInvoiceWithTemplate(endpoint: string, token: string, template: InvoiceTemplate, amount: Amount): Iterator<Effects> {
    const params = {
        amount: amount.value,
        metadata: template.metadata,
        currency: amount.currencyCode
    };
    const invoiceAndToken = yield call(request, endpoint, token, template.id, params);
    return yield put({
        type: TypeKeys.INVOICE_CREATED,
        payload: {
            invoice: invoiceAndToken.invoice,
            invoiceAccessToken: invoiceAndToken.invoiceAccessToken.payload
        }
    } as InvoiceCreated);
}
