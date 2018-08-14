import toNumber from 'lodash-es/toNumber';
import isNumber from 'lodash-es/isNumber';
import { CostType, InvoiceTemplateLineCostRange, InvoiceTemplateLineCostUnlim } from 'checkout/backend';

function validate(amount: number, min?: number, max?: number): boolean {
    if (!amount || !isNumber(amount) || amount <= 0) {
        return true;
    }
    if (min && max) {
        return !(amount >= min && amount <= max);
    }
    return false;
}

export const validateAmount = (
    value: string,
    cost: InvoiceTemplateLineCostRange | InvoiceTemplateLineCostUnlim
): boolean => {
    if (value) {
        value = value.replace(/\s/g, '').replace(/,/g, '.');
    }
    const binded = validate.bind(null, toNumber(value) * 100);
    switch (cost.costType) {
        case CostType.InvoiceTemplateLineCostRange:
            const range = (cost as InvoiceTemplateLineCostRange).range;
            return binded(range.lowerBound, range.upperBound);
        case CostType.InvoiceTemplateLineCostUnlim:
            return binded();
    }
};
