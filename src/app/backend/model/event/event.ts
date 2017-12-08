import { InvoiceChange } from './invoice-change';

export class Event {
    id: number;
    createdAt: string;
    changes: InvoiceChange[];
}
