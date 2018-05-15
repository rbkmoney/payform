import last from 'lodash-es/last';
import {
    Event,
    InvoiceChangeType,
    InvoiceStatusChanged,
    PaymentStatusChanged,
    PaymentStatuses,
    InvoiceStatuses
} from 'checkout/backend';

const fromPaymentStatusChanged = (change: PaymentStatusChanged): boolean => {
    switch (change.status) {
        case PaymentStatuses.processed:
        case PaymentStatuses.captured:
            return true;
        default:
            return false;
    }
};

const fromInvoiceStatusChanged = (change: InvoiceStatusChanged): boolean => {
    switch (change.status) {
        case InvoiceStatuses.paid:
        case InvoiceStatuses.fulfilled:
            return true;
        default:
            return false;
    }
};

const isSuccess = (event: Event): boolean => {
    const change = last(event.changes);
    switch (change.changeType) {
        case InvoiceChangeType.PaymentStatusChanged:
            return fromPaymentStatusChanged(change as PaymentStatusChanged);
        case InvoiceChangeType.InvoiceStatusChanged:
            return fromInvoiceStatusChanged(change as InvoiceStatusChanged);
        default:
            return false;
    }
};

export const getSessionStatus = (event: Event): number => isSuccess(event)
    ? ApplePaySession.STATUS_SUCCESS
    : ApplePaySession.STATUS_FAILURE;
