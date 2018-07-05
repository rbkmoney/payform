import { getLastChange } from 'checkout/utils';
import { CustomerBindingStatusChanged, PaymentStatusChanged } from 'checkout/backend';
import { ModelState } from 'checkout/state';
import { IntegrationType } from 'checkout/config';

export const getErrorFromEvents = (m: ModelState, integrationType: IntegrationType): string => {
    let lastChange;
    switch (integrationType) {
        case IntegrationType.invoice:
        case IntegrationType.invoiceTemplate:
            lastChange = (getLastChange(m.invoiceEvents) as PaymentStatusChanged);
            return lastChange.error ? lastChange.error.code : null;
        case IntegrationType.customer:
            lastChange = (getLastChange(m.customerEvents) as CustomerBindingStatusChanged);
            return lastChange.error ? lastChange.error.code : null;
    }
};
