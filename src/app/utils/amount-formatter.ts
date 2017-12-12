import { findCurrency, format } from 'currency-formatter';

export interface Amount {
    value: number;
    currencyCode: string;
}

export interface FormattedAmount {
    value: string;
    symbol: string;
}

export const getSymbol = (currencyCode: string): string => {
    return findCurrency(currencyCode).symbol;
};

export const formatAmount = (amount: Amount): FormattedAmount | null => (amount ? {
    value: format(amount.value / 100, {decimal: ', ', thousand: ' '}),
    symbol: getSymbol(amount.currencyCode)
} : null);
