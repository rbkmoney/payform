import { getAmountFromMultiLine } from './get-amount-from-multi-line';
import { AmountInfoStatus } from 'checkout/state';

it('should return amount', () => {
    const multiLine = {
        cart: [
            {
                cost: 100000,
                price: 100000,
                product: 'Product 1',
                quantity: 1
            },
            {
                cost: 400000,
                price: 200000,
                product: 'Product 2',
                quantity: 2,
                taxMode: {
                    rate: '0%',
                    type: 'InvoiceLineTaxVAT'
                }
            },
            {
                cost: 500000,
                price: 500000,
                product: 'Product 3',
                quantity: 1,
                taxMode: {
                    rate: '18%',
                    type: 'InvoiceLineTaxVAT'
                }
            }
        ],
        currency: 'RUB',
        templateType: 'InvoiceTemplateMultiLine'
    } as any;
    const actual = getAmountFromMultiLine(multiLine);
    const expected = {
        status: AmountInfoStatus.final,
        currencyCode: 'RUB',
        minorValue: 1000000
    };
    expect(actual).toEqual(expected);
});
