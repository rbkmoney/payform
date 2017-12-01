import { InvoiceTemplateLineCost } from './invoice-template-line-cost';

export class InvoiceTemplateLineCostFixed extends InvoiceTemplateLineCost {

    amount: number;
    currency: string;

    constructor(amount: number, currency: string) {
        super();
        this.costType = 'InvoiceTemplateLineCostFixed';
        this.amount = amount;
        this.currency = currency;
    }
}
