import { LifetimeInterval } from './invoice-template-details/lifetime-interval';
import { InvoiceTemplateDetails } from './invoice-template-details/invoice-template-details';

export class InvoiceTemplate {
    id: string;
    shopID: string;
    product: string;
    description: string;
    lifetime: LifetimeInterval;
    details: InvoiceTemplateDetails;
    metadata: object;
}
