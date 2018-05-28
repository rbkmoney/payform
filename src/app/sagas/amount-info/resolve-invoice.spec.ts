import { resolveInvoice } from './resolve-invoice';
import { AmountInfoStatus } from 'checkout/state';

it('should return amount', () => {
    const invoice = {
        amount: 10000,
        currency: 'RUB'
    } as any;
    const actual = resolveInvoice(invoice);
    const expected = {
        status: AmountInfoStatus.final,
        currencyCode: 'RUB',
        minorValue: 10000
    };
    expect(actual).toEqual(expected);
});
