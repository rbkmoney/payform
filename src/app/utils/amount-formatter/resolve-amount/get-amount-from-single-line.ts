import {
    CostType,
    InvoiceTemplateLineCostFixed,
    InvoiceTemplateLineCostRange,
    InvoiceTemplateSingleLine
} from 'checkout/backend';
import { Amount } from '../amount';

export const getAmountFromSingleLine = (details: InvoiceTemplateSingleLine, configAmount: number): Amount => {
    const price = details.price;
    if (!price) {
        return null;
    }
    switch (price.costType) {
        case CostType.InvoiceTemplateLineCostFixed:
            const fixed = price as InvoiceTemplateLineCostFixed;
            return {
                value: fixed.amount,
                currencyCode: fixed.currency
            };
        case CostType.InvoiceTemplateLineCostRange:
            return {
                value: configAmount,
                currencyCode: (price as InvoiceTemplateLineCostRange).currency
            };
        case CostType.InvoiceTemplateLineCostUnlim:
            return {
                value: configAmount,
                currencyCode: 'RUB' // TODO unlim cost type does't support currency
            };
    }
};
