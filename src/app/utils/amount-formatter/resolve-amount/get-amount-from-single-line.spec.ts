import { InvoiceTemplateLineCostFixed } from 'checkout/backend';
import { getAmountFromSingleLine } from './get-amount-from-single-line';

it('InvoiceTemplateLineCostFixed should return amount', () => {
    const singleLine = {
        price: {
            costType: 'InvoiceTemplateLineCostFixed',
            amount: 149900,
            currency: 'RUB'
        }
    } as any;
    const actual = getAmountFromSingleLine(singleLine, 111);
    const expected = {
        currencyCode: 'RUB',
        value: 149900
    };
    expect(actual).toEqual(expected);
});

it('InvoiceTemplateLineCostRange should return amount', () => {
    const singleLine = {
        price: {
            costType: 'InvoiceTemplateLineCostRange',
            range: {
                lowerBound: 1000,
                upperBound: 2000
            },
            currency: 'RUB'
        }
    } as any;
    const actual = getAmountFromSingleLine(singleLine, 111);
    const expected = {
        currencyCode: 'RUB',
        value: 111
    };
    expect(actual).toEqual(expected);
});

it('InvoiceTemplateLineCostUnlim should return amount', () => {
    const singleLine = {
        price: {
            costType: 'InvoiceTemplateLineCostUnlim'
        }
    } as any;
    const actual = getAmountFromSingleLine(singleLine, 111);
    const expected = {
        currencyCode: 'RUB',
        value: 111
    };
    expect(actual).toEqual(expected);
});
