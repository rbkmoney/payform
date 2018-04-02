import { findCurrency } from 'currency-formatter';

export const getSymbol = (currencyCode: string): string => findCurrency(currencyCode).symbol;
