import { InvoiceTemplateDetails } from './invoice-template-details';
import { InvoiceTemplateLineCost } from './invoice-template-line-cost';
import { InvoiceLineTaxMode } from '../invoice-cart/invoice-line-tax-mode';

export class InvoiceTemplateSingleLine extends InvoiceTemplateDetails {

    public product: string;
    public price: InvoiceTemplateLineCost;
    public taxMode?: InvoiceLineTaxMode;

    constructor(product: string, price: InvoiceTemplateLineCost) {
        super();
        this.templateType = 'InvoiceTemplateSingleLine';
        this.product = product;
        this.price = price;
    }
}
