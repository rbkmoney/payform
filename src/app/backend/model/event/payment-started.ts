import { InvoiceChange } from './invoice-change';
import { ChangeType } from 'checkout/backend';

export class PaymentStarted extends InvoiceChange {
    changeType = ChangeType.PaymentStarted;
    payment: any; // TODO need type payment
}
