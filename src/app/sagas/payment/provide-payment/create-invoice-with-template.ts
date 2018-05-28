import toNumber from 'lodash-es/toNumber';
import { call, CallEffect, put, PutEffect } from 'redux-saga/effects';
import { InvoiceTemplate } from 'checkout/backend';
import { createInvoiceWithTemplate as request } from 'checkout/backend';
import { InvoiceCreated, TypeKeys } from 'checkout/actions';
import { AmountInfoState, AmountInfoStatus } from 'checkout/state';

export type Effects = CallEffect | PutEffect<InvoiceCreated>;

const getAmount = (amountInfo: AmountInfoState, formAmount: string) => {
    switch (amountInfo.status) {
        case AmountInfoStatus.final:
            return amountInfo.minorValue;
        case AmountInfoStatus.notKnown:
            return toNumber(formAmount) * 100;
    }
};

export function* createInvoiceWithTemplate(endpoint: string, token: string, template: InvoiceTemplate, amountInfo: AmountInfoState, formAmount: string): Iterator<Effects> {
    const params = {
        amount: getAmount(amountInfo, formAmount),
        metadata: template.metadata,
        currency: amountInfo.currencyCode
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
