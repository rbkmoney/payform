import { InvoiceCreated } from 'checkout/backend';
import { Amount } from '../amount';

export const resolveInvoice = (invoiceCreated: InvoiceCreated): Amount => {
    const {invoice: {amount, currency}} = invoiceCreated;
    return {
        value: amount,
        currencyCode: currency
    };
};
