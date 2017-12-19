import { last } from 'lodash';
import { ChangeType, Event, InvoiceStatuses, PaymentStatuses, InvoiceChange } from 'checkout/backend';

type Statuses = PaymentStatuses | InvoiceStatuses;

export const getLastEventID = (e: Event[]): number => {
    const lastEvent = last(e);
    return lastEvent ? lastEvent.id : null;
};

export const getLastChange = (e: Event[], lastHandledEventID: number = 0): InvoiceChange => {
    const event = last(e);
    if (!event || event.id <= lastHandledEventID) {
        return;
    }
    return last(event.changes);
};

export const checkLastChange = (e: Event[], lastHandledEventID: number, changeType: ChangeType, ...statuses: Statuses[]): boolean => {
    const change = getLastChange(e, lastHandledEventID) as any;
    if (!change) {
        return false;
    }
    const typeChecked = change.changeType === changeType;
    let statusChecked = true;
    if (statuses && statuses.length > 0 && change.status) {
        statusChecked = !!statuses.find((status) => change.status === status);
    }
    return typeChecked && statusChecked;
};
