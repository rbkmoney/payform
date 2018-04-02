import { format } from 'currency-formatter';
import { Amount } from './amount';
import { FormattedAmount } from './formatted-amount';
import { getSymbol } from './get-symbol';

export const formatAmount = (amount: Amount): FormattedAmount | null =>
    (amount && amount.value ? {
        value: format(amount.value / 100, {decimal: ', ', thousand: ' '}),
        symbol: getSymbol(amount.currencyCode)
    } : null);
