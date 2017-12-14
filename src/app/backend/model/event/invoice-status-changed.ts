import { InvoiceChange } from './invoice-change';
import { ChangeType } from './change-type';

export class InvoiceStatusChanged extends InvoiceChange {
    changeType = ChangeType.InvoiceStatusChanged;
    status: 'paid' | 'cancelled';
    reason: string;
}
