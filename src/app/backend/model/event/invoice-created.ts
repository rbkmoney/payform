import { InvoiceChange } from './invoice-change';
import { Invoice } from '../invoice';
import { InvoiceChangeType } from 'checkout/backend/model/event/invoice-change-type';

export class InvoiceCreated extends InvoiceChange {
    changeType = InvoiceChangeType.InvoiceCreated;
    invoice: Invoice;
}
