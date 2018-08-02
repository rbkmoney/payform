import * as React from 'react';
import { Locale } from 'checkout/locale';
import { Event } from 'checkout/backend';
import { ResultFormContent, ResultFormType } from './result-form-content';
import * as styles from '../result-form.scss';
import { getInvoicePaymentDetails } from './payment-details';

const getDescription = (description: string, e: Event[]): JSX.Element => (
    <p className={styles.text}>
        {description} {getInvoicePaymentDetails(e).info}.
    </p>
);

const started = (l: Locale, e: Event[]): ResultFormContent => ({
    hasActions: false,
    hasDone: false,
    header: l['form.header.final.started.label'],
    description: getDescription(l['form.final.started.pay.text'], e),
    type: ResultFormType.WARNING
});

export const makeFromPaymentStarted = (l: Locale, e: Event[]): ResultFormContent => {
    return started(l, e);
};
