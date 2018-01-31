import { InvoiceChange } from './invoice-change';
import { Payment } from '../payment';
import { InvoiceChangeType } from './invoice-change-type';

export class PaymentStarted extends InvoiceChange {
    changeType = InvoiceChangeType.PaymentStarted;
    payment: Payment;
}
