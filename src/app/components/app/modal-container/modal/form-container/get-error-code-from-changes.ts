import get from 'lodash-es/get';
import { getLastChange } from 'checkout/utils';
import { Event } from 'checkout/backend';
import { IntegrationType } from 'checkout/config';

const getCode = (e: Event[]): string => get(getLastChange(e), 'error.code');

export const getErrorCodeFromEvents = (events: Event[], integrationType: IntegrationType): string => {
    switch (integrationType) {
        case IntegrationType.invoice:
        case IntegrationType.invoiceTemplate:
        case IntegrationType.customer:
            return getCode(events);
    }
    throw new Error('Unknown integration type.');
};
