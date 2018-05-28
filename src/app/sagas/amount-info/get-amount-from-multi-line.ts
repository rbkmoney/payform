import { InvoiceTemplateMultiLine } from 'checkout/backend';
import { AmountInfoState, AmountInfoStatus } from 'checkout/state';

export const getAmountFromMultiLine = (details: InvoiceTemplateMultiLine): AmountInfoState => ({
    status: AmountInfoStatus.final,
    minorValue: details.cart.reduce((p, c) => p + (c.price * c.quantity), 0),
    currencyCode: details.currency
});
