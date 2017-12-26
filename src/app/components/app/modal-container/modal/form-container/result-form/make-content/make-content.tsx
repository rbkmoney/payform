import * as React from 'react';
import {
    ChangeType,
    InvoiceStatusChanged,
    InvoiceStatuses, LogicError,
    PaymentStatusChanged,
    PaymentStatuses
} from 'checkout/backend';
import { Locale } from 'checkout/locale';
import { ModelState } from 'checkout/state';
import {
    ResultSubject,
    ResultSubjectError,
    ResultSubjectInvoiceChange,
    ResultSubjectType
} from 'checkout/form-flow';
import { Checkmark, Cross } from '../result-icons';
import { getFailedDescription } from './get-failed-description';
import { getSuccessDescription } from './get-success-description';

export interface ResultFormContent {
    hasActions: boolean;
    hasDone: boolean;
    header: string;
    description?: JSX.Element;
    icon: JSX.Element;
}

const gotFailedPayment = (l: Locale, m: ModelState, e: LogicError): ResultFormContent => ({
    hasActions: !!m.paymentResource,
    hasDone: false,
    header: l['form.header.final.failed.label'],
    description: getFailedDescription(l, e),
    icon: <Cross/>
});

const gotSuccessPayment = (l: Locale, m: ModelState): ResultFormContent => ({
    hasActions: false,
    hasDone: true,
    header: l['form.header.final.success.label'],
    description: getSuccessDescription(l, m),
    icon: <Checkmark/>
});

const alreadyPaid = (l: Locale) => ({
    hasActions: false,
    hasDone: false,
    header: l['form.header.final.already.success.label'],
    icon: <Checkmark/>
});

export const makeContentInvoiceChange = (l: Locale, m: ModelState, s: ResultSubjectInvoiceChange): ResultFormContent => {
    switch (s.change.changeType) {
        case ChangeType.InvoiceStatusChanged:
            const invoiceChange = s.change as InvoiceStatusChanged;
            switch (invoiceChange.status) {
                case InvoiceStatuses.paid:
                    return alreadyPaid(l);
                case InvoiceStatuses.cancelled:
                    return gotFailedPayment(l, m, {code: 'Payment was cancelled', message: 'Payment was cancelled'}); // TODO: make a normal change
            }
            break;
        case ChangeType.PaymentStatusChanged:
            const paymentChange = s.change as PaymentStatusChanged;
            switch (paymentChange.status) {
                case PaymentStatuses.failed:
                    return gotFailedPayment(l, m, paymentChange.error);
                case PaymentStatuses.processed:
                    return gotSuccessPayment(l, m);
            }
            break;
    }
};

const makeContentError = (l: Locale, m: ModelState, s: ResultSubjectError): ResultFormContent => gotFailedPayment(l, m, s.error);

export const makeContent = (l: Locale, m: ModelState, s: ResultSubject): ResultFormContent => {
    switch (s.type) {
        case ResultSubjectType.invoiceChange:
            return makeContentInvoiceChange(l, m, s as ResultSubjectInvoiceChange);
        case ResultSubjectType.error:
            return makeContentError(l, m, s as ResultSubjectError);
    }
    throw new Error('Unknown ResultSubject type');
};
