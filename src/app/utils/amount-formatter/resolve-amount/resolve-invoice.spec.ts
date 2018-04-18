import { resolveInvoice } from './resolve-invoice';

it('should return amount', () => {
    const invoice = {
        amount: 10000,
        currency: 'RUB'
    } as any;
    const actual = resolveInvoice(invoice);
    const expected = {
        currencyCode: 'RUB',
        value: 10000
    };
    expect(actual).toEqual(expected);
});
