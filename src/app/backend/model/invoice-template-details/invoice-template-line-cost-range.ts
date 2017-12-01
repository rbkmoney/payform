import { InvoiceTemplateLineCost } from './invoice-template-line-cost';
import { CostAmountRange } from './cost-amount-range';

export class InvoiceTemplateLineCostRange extends InvoiceTemplateLineCost {

    range: CostAmountRange;
    currency: string;

    constructor(range: CostAmountRange, currency: string) {
        super();
        this.costType = 'InvoiceTemplateLineCostRange';
        this.range = range;
        this.currency = currency;
    }
}
