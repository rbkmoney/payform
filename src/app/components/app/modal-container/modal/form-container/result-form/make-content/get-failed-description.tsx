import * as React from 'react';
import { Locale } from 'checkout/locale';
import * as styles from '../result-form.scss';
import { LogicError } from 'checkout/backend/model';

export const getFailedDescription = (l: Locale, e: LogicError): JSX.Element => {
    if (!e && !(e.code || e.message)) {
        return;
    }
    const localized = l[e.code];
    const message = e.message ? e.message : l['Unknown Failure'];
    return <p className={styles.text}>{localized ? localized : message}</p>;
};
