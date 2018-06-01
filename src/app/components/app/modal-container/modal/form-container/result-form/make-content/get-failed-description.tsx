import * as React from 'react';
import { Locale } from 'checkout/locale';
import { text } from '../result-form.scss';
import { LogicError } from 'checkout/backend';

const getDescription = (l: Locale, e: LogicError): string => {
    const result = l[e.code] ? l[e.code] : e.code;
    if (e.message) {
        return result ? result.concat(`.\n${e.message}`) : e.message;
    } else {
        return result;
    }
};

export const getFailedDescription = (l: Locale, e: LogicError): JSX.Element => {
    if (!e && !e.code) {
        return;
    }
    return <p className={text}>{getDescription(l, e)}</p>;
};
