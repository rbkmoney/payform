import { InvoiceTemplateDetails } from './invoice-template-details';
import { InvoiceLine } from '../invoice-cart/invoice-line';
import { TemplateType } from './template-type';

export class InvoiceTemplateMultiLine extends InvoiceTemplateDetails {
    templateType: TemplateType.InvoiceTemplateMultiLine;
    cart: InvoiceLine[];
    currency: string;
}
