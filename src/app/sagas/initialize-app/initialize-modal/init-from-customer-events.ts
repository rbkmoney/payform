import { getLastChange } from 'checkout/utils';
import { ModalState } from 'checkout/state';
import { CustomerBindingInteractionRequested, CustomerChangeType, CustomerEvent } from 'checkout/backend';
import { toInitialCustomerState } from './to-initial-customer-state';
import { toModalResult } from './to-modal-result';
import { provideCustomerInteraction } from '../../provide-modal';

export const initFromCustomerEvents = (events: CustomerEvent[]): ModalState => {
    if (!events || events.length === 0) {
        return toInitialCustomerState();
    }
    const change = getLastChange(events);
    switch (change.changeType) {
        case CustomerChangeType.CustomerBindingInteractionRequested:
            return provideCustomerInteraction(change as CustomerBindingInteractionRequested);
        case CustomerChangeType.CustomerBindingStatusChanged:
            return toInitialCustomerState();
        case CustomerChangeType.CustomerBindingStarted:
            return toModalResult();
    }
};
