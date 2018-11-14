import * as React from 'react';
import { InvoiceEvent, InvoiceStatusChanged, InvoiceStatuses, LogicError, LogicErrorCode } from 'checkout/backend';
import { Locale } from 'checkout/locale';
import { ResultFormContent, ResultFormType } from './result-form-content';
import { getLastChange } from 'checkout/utils';
import { getSuccessDescription } from './get-success-description';

const refunded = (l: Locale): ResultFormContent => ({
    hasActions: false,
    hasDone: false,
    header: l['form.header.final.invoice.refunded.label'],
    type: ResultFormType.WARNING
});

const alreadyPaid = (l: Locale, e: InvoiceEvent[]): ResultFormContent => ({
    hasActions: false,
    hasDone: false,
    header: l['form.header.final.invoice.paid.already.label'],
    description: getSuccessDescription(l, e),
    type: ResultFormType.SUCCESS
});

const paid = (l: Locale, e: InvoiceEvent[]): ResultFormContent => ({
    hasActions: false,
    hasDone: false,
    header: l['form.header.final.invoice.paid.label'],
    description: getSuccessDescription(l, e),
    type: ResultFormType.SUCCESS
});

const cancelled = (l: Locale): ResultFormContent => ({
    hasActions: false,
    hasDone: false,
    header: l['form.header.final.invoice.cancelled.label'],
    type: ResultFormType.ERROR
});

const fulfilled = (l: Locale, e: InvoiceEvent[]): ResultFormContent => ({
    hasActions: false,
    hasDone: false,
    header: l['form.header.final.invoice.fulfilled.label'],
    description: getSuccessDescription(l, e),
    type: ResultFormType.SUCCESS
});

export const makeFromInvoiceChange = (l: Locale, e: InvoiceEvent[], error: LogicError) => {
    const change = getLastChange(e) as InvoiceStatusChanged;
    switch (change.status) {
        case InvoiceStatuses.paid:
            if (error && error.code === LogicErrorCode.invalidInvoiceStatus) {
                return alreadyPaid(l, e);
            }
            return paid(l, e);
        case InvoiceStatuses.cancelled:
            return cancelled(l);
        case InvoiceStatuses.fulfilled:
            return fulfilled(l, e);
        case InvoiceStatuses.refunded:
            return refunded(l);
    }
    throw new Error('Unsupported InvoiceStatusChange');
};
