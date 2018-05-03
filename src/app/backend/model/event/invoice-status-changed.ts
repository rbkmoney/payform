import { InvoiceChange } from './invoice-change';
import { InvoiceChangeType } from './invoice-change-type';

export enum InvoiceStatuses {
    paid = 'paid',
    cancelled = 'cancelled',
    fulfilled = 'fulfilled',
    unpaid = 'unpaid',
    refunded = 'refunded'
}

export class InvoiceStatusChanged extends InvoiceChange {
    changeType = InvoiceChangeType.InvoiceStatusChanged;
    status: InvoiceStatuses;
    reason: string;
}
