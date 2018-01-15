import * as React from 'react';
import {
    ChangeType, Event,
    InvoiceStatusChanged,
    LogicError
} from 'checkout/backend';
import { Locale } from 'checkout/locale';
import { getLastChange } from 'checkout/utils';
import { ResultFormContent } from './result-form-content';
import { ResultFormInfo, ResultType } from 'checkout/state';
import { makeFromInvoiceChange } from './make-from-invoice-change';
import { failed, makeFromPaymentChange } from './make-from-payment-change';

export const makeContentProcessed = (l: Locale, e: Event[]): ResultFormContent => {
    const change = getLastChange(e);
    switch (change.changeType) {
        case ChangeType.InvoiceStatusChanged:
            return makeFromInvoiceChange(l, change as InvoiceStatusChanged);
        case ChangeType.PaymentStatusChanged:
            return makeFromPaymentChange(l, e);
    }
    throw new Error('Unsupported invoice ChangeType');
};

const makeContentError = (l: Locale, error: LogicError): ResultFormContent => failed(l, error);

export const makeContent = (i: ResultFormInfo, l: Locale, e: Event[], err: LogicError): ResultFormContent => {
    switch (i.resultType) {
        case ResultType.processed:
            return makeContentProcessed(l, e);
        case ResultType.error:
            return makeContentError(l, err);
    }
    throw new Error('Unsupported ResultType');
};
