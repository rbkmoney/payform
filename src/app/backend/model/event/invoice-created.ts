import { InvoiceChange } from './invoice-change';
import { Invoice } from '../invoice';
import { ChangeType } from 'checkout/backend/model/event/change-type';

export class InvoiceCreated extends InvoiceChange {
    changeType = ChangeType.InvoiceCreated;
    invoice: Invoice;
}
