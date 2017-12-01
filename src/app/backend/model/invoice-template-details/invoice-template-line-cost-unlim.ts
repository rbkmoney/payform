import { InvoiceTemplateLineCost } from './invoice-template-line-cost';

export class InvoiceTemplateLineCostUnlim extends InvoiceTemplateLineCost {
    constructor() {
        super();
        this.costType = 'InvoiceTemplateLineCostUnlim';
    }
}
