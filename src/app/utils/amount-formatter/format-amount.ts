import { format } from 'currency-formatter';
import { FormattedAmount } from './formatted-amount';
import { getSymbol } from './get-symbol';
import { AmountInfoState } from 'checkout/state';

export const formatAmount = (amount: AmountInfoState): FormattedAmount | null =>
    (amount && amount.minorValue ? {
        value: format(amount.minorValue / 100, {decimal: ', ', thousand: ' '}),
        symbol: getSymbol(amount.currencyCode)
    } : null);
