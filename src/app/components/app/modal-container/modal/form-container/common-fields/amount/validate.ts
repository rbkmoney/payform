import { CostType, InvoiceTemplateLineCostRange, InvoiceTemplateLineCostUnlim } from 'checkout/backend';
import { toNumber } from 'lodash';
import { validateAmount } from '../validation';

export const validate = (value: string, cost: InvoiceTemplateLineCostRange | InvoiceTemplateLineCostUnlim): boolean => {
    const binded = validateAmount.bind(null, toNumber(value) * 100);
    switch (cost.costType) {
        case CostType.InvoiceTemplateLineCostRange:
            const range = (cost as InvoiceTemplateLineCostRange).range;
            return binded(range.lowerBound, range.upperBound);
        case CostType.InvoiceTemplateLineCostUnlim:
            return binded();
    }
};
