import { InvoiceChange } from './invoice-change';
import { ChangeType } from './change-type';

export enum InvoiceStatuses {
    paid = 'paid',
    cancelled = 'cancelled'
}

export class InvoiceStatusChanged extends InvoiceChange {
    changeType = ChangeType.InvoiceStatusChanged;
    status: InvoiceStatuses;
    reason: string;
}
