import { InvoiceTemplateLineCost } from './invoice-template-line-cost';
import { CostType } from './cost-type';

export class InvoiceTemplateLineCostFixed extends InvoiceTemplateLineCost {
    costType: CostType.InvoiceTemplateLineCostFixed;
    amount: number;
    currency: string;
}
