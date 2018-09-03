import { InvoiceChange } from 'checkout/backend/model/event/invoice-change';
import { Event } from './event';

export class InvoiceEvent extends Event<InvoiceChange> {}
