import { InvoiceTemplateLineCostRange, InvoiceTemplateLineCostUnlim } from 'checkout/backend';
import { formatAmount, getSymbol } from 'checkout/utils';
import { AmountInfoStatus } from 'checkout/state';

const toUnlimPlaceholder = (localeString: string, currency: string): string => `${localeString} ${getSymbol(currency)}`;

const toRangePlaceholder = (cost: InvoiceTemplateLineCostRange): string => {
    const range = cost.range;
    const lower = formatAmount({
        minorValue: range.lowerBound,
        currencyCode: cost.currency,
        status: AmountInfoStatus.final
    });
    const upper = formatAmount({
        minorValue: range.upperBound,
        currencyCode: cost.currency,
        status: AmountInfoStatus.final
    });
    return `${lower.value} ${lower.symbol} - ${upper.value} ${upper.symbol}`;
};

export const getPlaceholder = (
    cost: InvoiceTemplateLineCostRange | InvoiceTemplateLineCostUnlim,
    localeString: string
): string => {
    if (!cost) {
        return;
    }
    switch (cost.costType) {
        case 'InvoiceTemplateLineCostUnlim':
            return toUnlimPlaceholder(localeString, 'RUB'); // TODO unlim cost type does't support currency
        case 'InvoiceTemplateLineCostRange':
            return toRangePlaceholder(cost as InvoiceTemplateLineCostRange);
    }
};
