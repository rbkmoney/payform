import { last, clone } from 'lodash';
import { ChangeType, Event, InvoiceChange } from 'checkout/backend';

export const getLastChange = (e: Event[]): InvoiceChange => {
    const event = last(e);
    if (!event) {
        return;
    }
    return last(event.changes);
};

export const findChange = (e: Event[], foundType: ChangeType): InvoiceChange => {
    if (!e || e.length === 0 || !foundType) {
        return null;
    }
    let result = null;
    const found = clone(e).reverse().find((event) => {
        const changes = event.changes.reverse();
        const foundChange = changes.find((change) => change.changeType === foundType);
        if (foundChange) {
            result = foundChange;
            return true;
        }
        return false;
    });
    return found ? result : null;
};
