import * as React from 'react';
import { Locale } from 'checkout/locale';
import * as styles from '../result-form.scss';
import {
    CustomerChangeType,
    CustomerEvent,
    CustomerBindingStatusChanged,
    CustomerBindingStatus
} from 'checkout/backend';
import { ResultFormContent } from './result-form-content';
import { getLastChange } from 'checkout/utils';
import { Checkmark } from '../result-icons';
import { getCustomerPaymentDetails } from './payment-details';
import { Cross, Warning } from '../result-icons';
import { getFailedDescription } from './get-failed-description';

const getDescription = (prefix: string, e: CustomerEvent[]): JSX.Element => (
    <p className={styles.text}>
        {prefix} {getCustomerPaymentDetails(e).info}.
    </p>
);

const failed = (l: Locale, e: CustomerBindingStatusChanged) => ({
    hasActions: true,
    hasDone: false,
    description: getFailedDescription(l, e.error),
    header: l['form.header.final.customer.binding.failed.label'],
    icon: <Cross/>
});

const succeeded = (l: Locale, e: CustomerEvent[]): ResultFormContent => ({
    hasActions: false,
    hasDone: true,
    header: l['form.header.final.customer.binding.success.label'],
    description: getDescription(l['form.final.success.binding.text'], e),
    icon: <Checkmark/>
});

const started = (l: Locale, e: CustomerEvent[]): ResultFormContent => ({
    hasActions: false,
    hasDone: false,
    header: l['form.header.final.started.label'],
    description: getDescription(l['form.final.started.binding.text'], e),
    icon: <Warning/>
});

const makeFromCustomerBindingChange = (l: Locale, e: CustomerEvent[]): ResultFormContent => {
    const change = getLastChange(e) as CustomerBindingStatusChanged;
    switch (change.status) {
        case CustomerBindingStatus.succeeded:
            return succeeded(l, e);
        case CustomerBindingStatus.failed:
            return failed(l, change);
        case CustomerBindingStatus.pending:
            throw new Error('Unsupported CustomerBindingStatus');
    }
};

export const makeContentCustomer = (l: Locale, e: CustomerEvent[]): ResultFormContent => {
    const change = getLastChange(e);
    switch (change.changeType) {
        case CustomerChangeType.CustomerBindingStatusChanged:
            return makeFromCustomerBindingChange(l, e);
        case CustomerChangeType.CustomerBindingStarted:
            return started(l, e);
    }
    throw new Error('Unsupported CustomerChangeType');
};
