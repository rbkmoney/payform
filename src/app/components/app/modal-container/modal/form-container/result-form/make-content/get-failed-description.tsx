import * as React from 'react';
import { Locale } from 'checkout/locale';
import * as styles from '../result-form.scss';
import { PaymentError } from 'checkout/backend';

export const getFailedDescription = (l: Locale, e: PaymentError): JSX.Element => {
    if (!e && !e.code) {
        return;
    }
    const localized = l[e.code];
    return <p className={styles.text}>{localized ? localized : e.code}</p>;
};
