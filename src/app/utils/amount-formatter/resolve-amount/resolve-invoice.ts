import { Invoice } from 'checkout/backend';
import { Amount } from '../amount';

export const resolveInvoice = (invoice: Invoice): Amount => {
    const {amount, currency} = invoice;
    return {
        value: amount,
        currencyCode: currency
    };
};
