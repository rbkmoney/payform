import { InvoiceTemplateMultiLine } from 'checkout/backend';
import { Amount } from '../amount';

export const getAmountFromMultiLine = (details: InvoiceTemplateMultiLine): Amount => ({
    value: details.cart.reduce((p, c) => p + (c.price * c.quantity), 0),
    currencyCode: details.currency
});
