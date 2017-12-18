import { last } from 'lodash';
import { ChangeType, Event, InvoiceStatuses, PaymentStatuses, InvoiceChange } from 'checkout/backend';

type Statuses = PaymentStatuses | InvoiceStatuses;

export const getLastChange = (e: Event[]): InvoiceChange => {
    const event = last(e);
    if (!event) {
        return;
    }
    return last(event.changes);
};

export const checkLastChange = (e: Event[], changeType: ChangeType, ...statuses: Statuses[]): boolean => {
    const change = getLastChange(e) as any;
    if (!change) {
        return;
    }
    const typeChecked = change.changeType === changeType;
    let statusChecked = true;
    if (statuses && statuses.length > 0 && change.status) {
        statusChecked = !!statuses.find((status) => change.status === status);
    }
    return typeChecked && statusChecked;
};
