import { InvoiceLine } from './invoice-cart/invoice-line';
import { InvoiceStatus } from './invoice-status';

export class Invoice {
    id: string;
    shopID: string;
    invoiceTemplateID: string;
    createdAt: string;
    dueDate: string;
    amount: number;
    currency: string;
    metadata: object;
    product: string;
    description: string;
    status: InvoiceStatus;
    reason: string;
    cart: InvoiceLine[];
}
