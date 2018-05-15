import * as React from 'react';
import { Locale } from 'checkout/locale';
import { text } from '../result-form.scss';
import { LogicError } from 'checkout/backend';

const getDescription = (l: Locale, e: LogicError) => {
    const localized = l[e.code];
    const result = localized ? localized : e.code;
    return e.message ? result.concat(`.\n${e.message}`) : result;
};

export const getFailedDescription = (l: Locale, e: LogicError): JSX.Element => {
    if (!e && !e.code) {
        return;
    }
    return <p className={text}>{getDescription(l, e)}</p>;
};
