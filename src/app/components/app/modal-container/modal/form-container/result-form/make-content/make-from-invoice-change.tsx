import * as React from 'react';
import { InvoiceStatusChanged, InvoiceStatuses } from 'checkout/backend';
import { Locale } from 'checkout/locale';
import { ResultFormContent } from './result-form-content';
import { Checkmark, Cross } from '../result-icons';

const paid = (l: Locale): ResultFormContent => ({
    hasActions: false,
    hasDone: false,
    header: l['form.header.final.invoice.paid.label'],
    icon: <Checkmark/>
});

const cancelled = (l: Locale): ResultFormContent => ({
    hasActions: false,
    hasDone: false,
    header: l['form.header.final.invoice.cancelled.label'],
    icon: <Cross/>
});

const fulfilled = (l: Locale): ResultFormContent => ({
    hasActions: false,
    hasDone: false,
    header: l['form.header.final.invoice.fulfilled.label'],
    icon: <Cross/>
});

export const makeFromInvoiceChange = (l: Locale, change: InvoiceStatusChanged) => {
    switch (change.status) {
        case InvoiceStatuses.paid:
            return paid(l);
        case InvoiceStatuses.cancelled:
            return cancelled(l);
        case InvoiceStatuses.fulfilled:
            return fulfilled(l);
    }
    throw new Error('Unsupported InvoiceStatusChange');
};
