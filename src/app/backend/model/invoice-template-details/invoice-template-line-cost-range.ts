import { InvoiceTemplateLineCost } from './invoice-template-line-cost';
import { CostAmountRange } from './cost-amount-range';
import { CostType } from './cost-type';

export class InvoiceTemplateLineCostRange extends InvoiceTemplateLineCost {
    costType: CostType.InvoiceTemplateLineCostRange;
    range: CostAmountRange;
    currency: string;
}
