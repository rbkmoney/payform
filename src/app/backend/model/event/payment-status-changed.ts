import { InvoiceChange } from './invoice-change';
import { LogicError } from '../logic-error';
import { ChangeType } from './change-type';

export enum PaymentStatuses {
    processed = 'processed',
    failed = 'failed',
    cancelled = 'cancelled'
}

export class PaymentStatusChanged extends InvoiceChange {
    changeType = ChangeType.PaymentStatusChanged;
    status: PaymentStatuses;
    paymentID: string;
    error: LogicError;
}
