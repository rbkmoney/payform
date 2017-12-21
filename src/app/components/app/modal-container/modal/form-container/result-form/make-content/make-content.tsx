import * as React from 'react';
import {
    ChangeType,
    InvoiceStatusChanged,
    InvoiceStatuses, LogicError,
    PaymentStatusChanged,
    PaymentStatuses
} from 'checkout/backend';
import { Locale } from 'checkout/locale';
import { getSuccessDescription } from './get-success-description';
import { ModelState } from 'checkout/state';
import {
    ResultSubject,
    ResultSubjectError,
    ResultSubjectInvoiceChange,
    ResultSubjectType
} from 'checkout/form-flow';
import { getFailedDescription } from './get-failed-description';

export interface ResultFormContent {
    hasActions: boolean;
    header: string;
    description?: JSX.Element;
    image: string;
}

const gotFailedPayment = (l: Locale, e: LogicError): ResultFormContent => ({
    hasActions: true,
    header: l['form.header.final.failed.label'],
    description: getFailedDescription(l, e),
    image: 'http://www.rabbitpoets.com/wp-content/uploads/2009/07/spiceandwolf21.jpg'
});

const gotSuccessPayment = (l: Locale, m: ModelState): ResultFormContent => ({
    hasActions: false,
    header: l['form.header.final.success.label'],
    description: getSuccessDescription(l, m),
    image: 'https://avatanplus.com/files/resources/mid/56ece2c5863321538d55d3ae.png'
});

const alreadyPaid = (l: Locale) => ({
    hasActions: false,
    header: l['form.header.final.already.success.label'],
    image: 'https://avatanplus.com/files/resources/mid/56ece2c5863321538d55d3ae.png'
});

const makeContentInvoiceChange = (l: Locale, m: ModelState, s: ResultSubjectInvoiceChange): ResultFormContent => {
    switch (s.change.changeType) {
        case ChangeType.InvoiceStatusChanged:
            const invoiceChange = s.change as InvoiceStatusChanged;
            switch (invoiceChange.status) {
                case InvoiceStatuses.paid:
                    return alreadyPaid(l);
            }
            break;
        case ChangeType.PaymentStatusChanged:
            const paymentChange = s.change as PaymentStatusChanged;
            switch (paymentChange.status) {
                case PaymentStatuses.failed:
                    return gotFailedPayment(l, paymentChange.error);
                case PaymentStatuses.processed:
                    return gotSuccessPayment(l, m);
            }
            break;
    }
};

const makeContentError = (l: Locale, s: ResultSubjectError): ResultFormContent => gotFailedPayment(l, s.error);

export const makeContent = (l: Locale, m: ModelState, s: ResultSubject): ResultFormContent => {
    switch (s.type) {
        case ResultSubjectType.invoiceChange:
            return makeContentInvoiceChange(l, m, s as ResultSubjectInvoiceChange);
        case ResultSubjectType.error:
            return makeContentError(l, s as ResultSubjectError);
    }
    throw new Error('Unknown ResultSubject type');
};
