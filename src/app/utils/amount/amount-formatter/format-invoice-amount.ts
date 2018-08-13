import { format } from 'currency-formatter';
import { Invoice } from 'checkout/backend';
import { FormattedAmount } from './formatted-amount';
import { getSymbol } from './get-symbol';

export const formatInvoiceAmount = (invoice: Invoice): FormattedAmount =>
    invoice
        ? {
              value: format(invoice.amount / 100, { decimal: ', ', thousand: ' ' }),
              symbol: getSymbol(invoice.currency)
          }
        : null;
