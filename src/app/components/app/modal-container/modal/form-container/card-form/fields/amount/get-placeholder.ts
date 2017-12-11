import { InvoiceTemplateLineCostRange, InvoiceTemplateLineCostUnlim } from 'checkout/backend';
import { formatAmount, getSymbol } from 'checkout/utils';

const toUnlimPlaceholder = (): string => {
    return `Сумма к оплате ${getSymbol('RUB')}`;
};

const toRangePlaceholder = (cost: InvoiceTemplateLineCostRange): string => {
    const range = cost.range;
    const lower = formatAmount({value: range.lowerBound, currencyCode: cost.currency});
    const upper = formatAmount({value: range.upperBound, currencyCode: cost.currency});
    return `${lower.value} ${lower.symbol} - ${upper.value} ${upper.symbol}`;
};

export const getPlaceholder = (cost: InvoiceTemplateLineCostRange | InvoiceTemplateLineCostUnlim): string => {
    switch (cost.costType) {
        case 'InvoiceTemplateLineCostUnlim':
            return toUnlimPlaceholder();
        case 'InvoiceTemplateLineCostRange':
            return toRangePlaceholder(cost as InvoiceTemplateLineCostRange);
    }
};
