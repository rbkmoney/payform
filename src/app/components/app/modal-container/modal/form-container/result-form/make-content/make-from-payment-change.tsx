import * as React from 'react';
import { Locale } from 'checkout/locale';
import { Event, LogicError, PaymentError, PaymentStatusChanged, PaymentStatuses } from 'checkout/backend';
import { ResultFormContent } from './result-form-content';
import { getFailedDescription } from './get-failed-description';
import { getSuccessDescription } from './get-success-description';
import { Checkmark, Cross } from '../result-icons';
import { getLastChange } from 'checkout/utils';

export const failed = (l: Locale, e: PaymentError | LogicError): ResultFormContent => ({
    hasActions: true,
    hasDone: false,
    header: l['form.header.final.failed.label'],
    description: getFailedDescription(l, e),
    icon: <Cross/>
});

const processed = (l: Locale, e: Event[]): ResultFormContent => ({
    hasActions: false,
    hasDone: true,
    header: l['form.header.final.success.label'],
    description: getSuccessDescription(l, e),
    icon: <Checkmark/>
});

export const makeFromPaymentChange = (l: Locale, e: Event[]) => {
    const change = getLastChange(e) as PaymentStatusChanged;
    switch (change.status) {
        case PaymentStatuses.failed:
            return failed(l, change.error);
        case PaymentStatuses.processed:
            return processed(l, e);
        case PaymentStatuses.cancelled:
        case PaymentStatuses.captured:
        case PaymentStatuses.refunded:
        case PaymentStatuses.pending:
            throw new Error('Unhandled PaymentStatusChanged');
    }
    throw new Error('Unsupported PaymentStatusChanged');
};
