import * as React from 'react';
import * as styles from '../result-form.scss';
import {
    ChangeType,
    InvoiceStatusChanged,
    InvoiceStatuses,
    PaymentStatusChanged,
    PaymentStatuses
} from 'checkout/backend';
import { Locale } from 'checkout/locale';
import { getDescription } from './get-description';
import { ModelState } from 'checkout/state';
import { FormFlowItem, ResultFormFlowItem } from 'checkout/form-flow';
import { Checkmark, Cross } from '../result-icons';

const gotFailedPayment = (l: Locale, c: PaymentStatusChanged): ResultFormContent => ({
    hasActions: true,
    header: l['form.header.final.failed.label'],
    description: c.error && c.error.code ? <p className={styles.text}>{l[c.error.code]}</p> : null,
    icon: <Cross/>
});

const gotSuccessPayment = (l: Locale, m: ModelState): ResultFormContent => ({
    hasActions: false,
    header: l['form.header.final.success.label'],
    description: getDescription(l, m),
    icon: <Checkmark/>
});

const alreadyPaid = (l: Locale) => ({
    hasActions: false,
    header: l['form.header.final.already.success.label'],
    icon: <Checkmark/>
});

export interface ResultFormContent {
    hasActions: boolean;
    header: string;
    description?: JSX.Element;
    icon: JSX.Element;
}

export const makeContent = (l: Locale, m: ModelState, active: FormFlowItem): ResultFormContent => {
    const flowItem = active as ResultFormFlowItem;
    const change = flowItem.change;
    switch (change.changeType) {
        case ChangeType.InvoiceStatusChanged:
            const invoiceChange = change as InvoiceStatusChanged;
            switch (invoiceChange.status) {
                case InvoiceStatuses.paid:
                    return alreadyPaid(l);
            }
            break;
        case ChangeType.PaymentStatusChanged:
            const paymentChange = change as PaymentStatusChanged;
            switch (paymentChange.status) {
                case PaymentStatuses.failed:
                    return gotFailedPayment(l, paymentChange);
                case PaymentStatuses.processed:
                    return gotSuccessPayment(l, m);
            }
            break;
    }
};
