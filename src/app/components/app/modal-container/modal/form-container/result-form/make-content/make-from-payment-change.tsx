import * as React from 'react';
import { Locale } from 'checkout/locale';
import { Event, LogicError, PaymentError, PaymentStatusChanged, PaymentStatuses } from 'checkout/backend';
import { ResultFormContent } from './result-form-content';
import { getFailedDescription } from './get-failed-description';
import { getSuccessDescription } from './get-success-description';
import { SuccessIcon, ErrorIcon, WarningIcon } from '../result-icons';
import { getLastChange } from 'checkout/utils';

export const refunded = (l: Locale): ResultFormContent => ({
    hasActions: false,
    hasDone: true,
    header: l['form.header.final.refunded.label'],
    icon: <WarningIcon />
});

export const pending = (l: Locale): ResultFormContent => ({
    hasActions: false,
    hasDone: false,
    header: l['form.header.final.pending.label'],
    icon: <WarningIcon />
});

export const cancelled = (l: Locale): ResultFormContent => ({
    hasActions: true,
    hasDone: false,
    header: l['form.header.final.cancelled.label'],
    icon: <WarningIcon />
});

export const failed = (l: Locale, e: PaymentError | LogicError): ResultFormContent => ({
    hasActions: true,
    hasDone: false,
    header: l['form.header.final.failed.label'],
    description: getFailedDescription(l, e),
    icon: <ErrorIcon />
});

const processed = (l: Locale, e: Event[]): ResultFormContent => ({
    hasActions: false,
    hasDone: true,
    header: l['form.header.final.success.label'],
    description: getSuccessDescription(l, e),
    icon: <SuccessIcon />
});

export const makeFromPaymentChange = (l: Locale, e: Event[]) => {
    const change = getLastChange(e) as PaymentStatusChanged;
    switch (change.status) {
        case PaymentStatuses.failed:
            return failed(l, change.error);
        case PaymentStatuses.processed:
        case PaymentStatuses.captured:
            return processed(l, e);
        case PaymentStatuses.cancelled:
            return cancelled(l);
        case PaymentStatuses.pending:
            return pending(l);
        case PaymentStatuses.refunded:
            return refunded(l);
    }
    throw new Error('Unsupported PaymentStatusChanged');
};
