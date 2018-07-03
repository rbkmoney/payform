import { getLastChange } from 'checkout/utils';
import { CustomerBindingStatusChanged, CustomerEvent, Event, PaymentStatusChanged } from 'checkout/backend';

export const getErrorFromEvents = (e: Event[] | CustomerEvent[]): string => {
    const error = (getLastChange(e) as PaymentStatusChanged | CustomerBindingStatusChanged).error;
    return error ? error.code : null;
};
