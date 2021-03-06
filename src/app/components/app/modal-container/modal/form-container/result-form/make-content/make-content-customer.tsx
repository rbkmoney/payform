import * as React from 'react';

import { Locale } from 'checkout/locale';
import {
    CustomerBindingStatus,
    CustomerBindingStatusChanged,
    CustomerChangeType,
    CustomerEvent
} from 'checkout/backend';
import { ResultFormContent } from './result-form-content';
import { getLastChange } from 'checkout/utils';
import { getCustomerPaymentDetails } from './payment-details';
import { getFailedDescription } from './get-failed-description';
import { ResultFormType } from 'checkout/components/app/modal-container/modal/form-container/result-form/make-content/result-form-content';
import { EventsStatus } from 'checkout/state';
import { Text } from './text';

const getDescription = (prefix: string, e: CustomerEvent[]): JSX.Element => (
    <Text>
        {prefix} {getCustomerPaymentDetails(e).info}.
    </Text>
);

const failed = (l: Locale, e: CustomerBindingStatusChanged) => ({
    hasActions: true,
    hasDone: false,
    description: getFailedDescription(l, e.error),
    header: l['form.header.final.customer.binding.failed.label'],
    type: ResultFormType.ERROR
});

const succeeded = (l: Locale, e: CustomerEvent[]): ResultFormContent => ({
    hasActions: false,
    hasDone: true,
    header: l['form.header.final.customer.binding.success.label'],
    description: getDescription(l['form.final.success.binding.text'], e),
    type: ResultFormType.SUCCESS
});

const started = (l: Locale, e: CustomerEvent[]): ResultFormContent => ({
    hasActions: false,
    hasDone: false,
    header: l['form.header.final.started.label'],
    description: getDescription(l['form.final.started.binding.text'], e),
    type: ResultFormType.WARNING
});

export const pending = (l: Locale): ResultFormContent => ({
    hasActions: false,
    hasDone: false,
    header: l['form.header.final.pending.label'],
    type: ResultFormType.WARNING
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

export const makeContentCustomer = (l: Locale, e: CustomerEvent[], eventsStatus: EventsStatus): ResultFormContent => {
    switch (eventsStatus) {
        case EventsStatus.init:
        case EventsStatus.polled:
            const change = getLastChange(e);
            switch (change.changeType) {
                case CustomerChangeType.CustomerBindingStatusChanged:
                    return makeFromCustomerBindingChange(l, e);
                case CustomerChangeType.CustomerBindingStarted:
                    return started(l, e);
            }
            throw new Error('Unsupported CustomerChangeType');
        case EventsStatus.timeout:
            return pending(l);
    }
    throw new Error('Unsupported eventsStatus');
};
