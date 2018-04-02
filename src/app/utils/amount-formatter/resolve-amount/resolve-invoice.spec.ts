import { resolveInvoice } from './resolve-invoice';

it('should return amount', () => {
    const invoiceCreated = {
        invoice: {
            amount: 10000,
            currency: 'RUB'
        }
    } as any;
    const actual = resolveInvoice(invoiceCreated);
    const expected = {
        currencyCode: 'RUB',
        value: 10000
    };
    expect(actual).toEqual(expected);
});
