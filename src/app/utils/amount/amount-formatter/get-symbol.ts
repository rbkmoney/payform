import { findCurrency } from 'currency-formatter';

export const getSymbol = (currencyCode: string): string => {
    const currency = findCurrency(currencyCode);
    return currency ? currency.symbol : currencyCode;
};
