import { InvoiceChangeType, Event } from 'checkout/backend';
import { Locale } from 'checkout/locale';
import { getLastChange } from 'checkout/utils';
import { ResultFormContent } from './result-form-content';
import { makeFromInvoiceChange } from './make-from-invoice-change';
import { makeFromPaymentChange } from './make-from-payment-change';
import { makeFromPaymentStarted } from './make-from-payment-started';

export const makeContentInvoice = (l: Locale, e: Event[]): ResultFormContent => {
    const change = getLastChange(e);
    switch (change.changeType) {
        case InvoiceChangeType.InvoiceStatusChanged:
            return makeFromInvoiceChange(l, e);
        case InvoiceChangeType.PaymentStatusChanged:
            return makeFromPaymentChange(l, e);
        case InvoiceChangeType.PaymentStarted:
            return makeFromPaymentStarted(l, e);
    }
    throw new Error('Unsupported invoice ChangeType');
};
