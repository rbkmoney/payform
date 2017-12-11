import { InvoiceTemplateDetails } from './invoice-template-details';
import { InvoiceTemplateLineCost } from './invoice-template-line-cost';
import { InvoiceLineTaxMode } from '../invoice-cart/invoice-line-tax-mode';
import { TemplateType } from './template-type';

export class InvoiceTemplateSingleLine extends InvoiceTemplateDetails {
    templateType: TemplateType.InvoiceTemplateSingleLine;
    product: string;
    price: InvoiceTemplateLineCost;
    taxMode?: InvoiceLineTaxMode;
}
