import * as React from 'react';

import { Locale } from 'checkout/locale';
import { LogicError } from 'checkout/backend';
import { Text } from './text';

const getDescription = (l: Locale, e: LogicError): string => {
    const result: string = (l[e.code as keyof Locale] as string) || e.code;
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
    return <Text>{getDescription(l, e)}</Text>;
};
