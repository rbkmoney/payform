import { InvoiceChange } from './invoice-change';
import { Payment } from '../payment';
import { ChangeType } from './change-type';

export class PaymentStarted extends InvoiceChange {
    changeType = ChangeType.PaymentStarted;
    payment: Payment;
}
