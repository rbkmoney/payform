import { Invoice } from 'checkout/backend';
import { AmountInfoState, AmountInfoStatus } from 'checkout/state';

export const resolveInvoice = (invoice: Invoice): AmountInfoState => {
    const {amount, currency} = invoice;
    return {
        status: AmountInfoStatus.final,
        minorValue: amount,
        currencyCode: currency
    };
};
