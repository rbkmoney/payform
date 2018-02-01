import { InvoiceChangeType, Event } from 'checkout/backend';
import { Locale } from 'checkout/locale';
import { getLastChange } from 'checkout/utils';
import { ResultFormContent } from './result-form-content';
import { makeFromInvoiceChange } from './make-from-invoice-change';
import { makeFromPaymentChange } from './make-from-payment-change';

export const makeContentInvoice = (l: Locale, e: Event[]): ResultFormContent => {
    const change = getLastChange(e);
    switch (change.changeType) {
        case InvoiceChangeType.InvoiceStatusChanged:
            return makeFromInvoiceChange(l, e);
        case InvoiceChangeType.PaymentStatusChanged:
            return makeFromPaymentChange(l, e);
    }
    throw new Error('Unsupported invoice ChangeType');
};
