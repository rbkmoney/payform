import { InvoiceChange } from './invoice-change';
import { LogicError } from '../logic-error';
import { ChangeType } from './change-type';

export class PaymentStatusChanged extends InvoiceChange {
    changeType = ChangeType.PaymentStatusChanged;
    status: 'processed' | 'failed' | 'cancelled';
    paymentID: string;
    error: LogicError;
}
