import get from 'lodash-es/get';
import { getLastChange } from 'checkout/utils';
import { CustomerEvent, Event } from 'checkout/backend';
import { ModelState } from 'checkout/state';
import { IntegrationType } from 'checkout/config';

const getCode = (e: Event[] | CustomerEvent[]): string => get(getLastChange(e), 'error.code');

export const getErrorCodeFromEvents = (m: ModelState, integrationType: IntegrationType): string => {
    switch (integrationType) {
        case IntegrationType.invoice:
        case IntegrationType.invoiceTemplate:
            return getCode(m.invoiceEvents);
        case IntegrationType.customer:
            return getCode(m.customerEvents);
    }
};
