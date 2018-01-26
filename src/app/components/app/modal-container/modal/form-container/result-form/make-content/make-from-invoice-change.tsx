import * as React from 'react';
import { Event, InvoiceStatusChanged, InvoiceStatuses } from 'checkout/backend';
import { Locale } from 'checkout/locale';
import { ResultFormContent } from './result-form-content';
import { Checkmark, Cross } from '../result-icons';
import { getLastChange } from 'checkout/utils';
import { getSuccessDescription } from './get-success-description';

const paid = (l: Locale, e: Event[]): ResultFormContent => ({
    hasActions: false,
    hasDone: false,
    header: l['form.header.final.invoice.paid.label'],
    description: getSuccessDescription(l, e),
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

export const makeFromInvoiceChange = (l: Locale, e: Event[]) => {
    const change = getLastChange(e) as InvoiceStatusChanged;
    switch (change.status) {
        case InvoiceStatuses.paid:
            return paid(l, e);
        case InvoiceStatuses.cancelled:
            return cancelled(l);
        case InvoiceStatuses.fulfilled:
            return fulfilled(l);
    }
    throw new Error('Unsupported InvoiceStatusChange');
};
